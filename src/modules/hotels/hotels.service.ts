import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { Repository } from 'typeorm';
import { HotelListResult } from './hotel.list.result';
import { HotelDetailsResult } from './dto/hotel.details.result';
import { ReviewsService } from '../reviews/reviews.service';
import { TermsService } from '../terms/terms.service';
import { TermsDetailsResult } from '../terms/dto/terms.details.result';
import { RoomsService } from '../rooms/rooms.service';
import { LandlordType } from '../landlords/landlord.type.enum';
import { OrdersService } from '../orders/orders.service';
import { FindAvailableHotelsDto } from './dto/find.available.hotels.dto';
import { CreateHotelDto } from './dto/create.hotel.dto';
import { ConveniencesService } from '../conveniences/conveniences.service';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private readonly repository: Repository<Hotel>,
    private readonly reviewsService: ReviewsService,
    private readonly termsService: TermsService,
    private readonly roomsService: RoomsService,
    private readonly ordersService: OrdersService,
    private readonly conveniencesService: ConveniencesService,
  ) {}

  async create(body: CreateHotelDto) {
    const hotel = new Hotel();
    hotel.name = body.name;
    hotel.address = body.address;
    hotel.cheapestPrice = body.price;
    hotel.description = body.description;
    hotel.image = body.image;

    if (body.conveniences && body.conveniences.length > 0) {
      hotel.conveniences = await this.conveniencesService.findAllByIds(
        body.conveniences,
      );
    }

    const result = this.repository.create(hotel);
    return await this.repository.save(result);
  }

  async getHotelsByCityId(
    page: number,
    limit: number,
    sort: string,
    direction: string,
    cityId?: number,
  ): Promise<HotelListResult[]> {
    const skip = limit * (page - 1);
    const order: { [key: string]: 'ASC' | 'DESC' } = {};

    if (sort === 'popularity') {
      order.hotels = direction as 'ASC' | 'DESC';
    } else if (sort === 'name') {
      order.name = direction as 'ASC' | 'DESC';
    }

    let queryBuilder = this.repository
      .createQueryBuilder('hotel')
      .leftJoinAndSelect('hotel.rooms', 'rooms')
      .leftJoinAndSelect('hotel.conveniences', 'conveniences')
      .leftJoinAndSelect('hotel.landlord', 'landlord')
      .where('landlord.type = :type', { type: LandlordType.COMPANY });
    if (cityId) {
      queryBuilder = queryBuilder.where('hotel.cityId = :cityId', { cityId });
    }
    queryBuilder.orderBy(order);

    const hotels = await queryBuilder.skip(skip).take(limit).getMany();

    const result = hotels.map(async (hotel) => ({
      id: hotel.id,
      name: hotel.name,
      address: hotel.address,
      img: hotel.image,
      rooms: hotel.rooms.length,
      totalPlaces: await this.countTotalPlaces(hotel.id),
      conveniences: hotel.conveniences,
      cheapestPrice: hotel.cheapestPrice,
      availableHotels: hotels.length,
      totalHotels: hotels.length,
    }));

    return Promise.all(result);
  }

  async getHotelById(id: number): Promise<HotelDetailsResult> {
    const hotel = await this.repository.findOne({
      where: { id: id },
      relations: {
        city: true,
        conveniences: true,
        term: { registration: true, habitations: true },
        rooms: true,
        reviews: true,
      },
    });

    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }

    const reviews = await this.reviewsService.getReviewsByHotelId(hotel.id);
    const terms = await this.termsService.getByHotelId(hotel.id);
    const rooms = await this.roomsService.getByHotelId(hotel.id);

    const termDetails: TermsDetailsResult = {
      id: terms.id,
      prepaymentPercentage: terms.prepaymentPercentage,
      reservationCancel: terms.reservationCancel,
      registration: terms.registration,
      habitations: terms.habitations.map((habitation) => ({
        id: habitation.id,
        rule: habitation.rule,
      })),
    };

    return {
      id: hotel.id,
      title: hotel.name,
      address: hotel.address,
      rating: hotel.rating,
      reviews: reviews.map((review) => ({
        id: review.id,
        username: review.user.getFullName(),
        spendTime: review.daysSpent,
        timestamp: review.createdAt, // TODO change to order creation date
        rate: review.rating,
        comment: review.comment,
      })),
      totalReviews: reviews.length,
      minPrice: hotel.cheapestPrice,
      description: hotel.description,
      conveniences: hotel.conveniences.map((convenience) => ({
        id: convenience.id,
        title: convenience.name,
        icon: convenience.icon,
      })),
      rules: termDetails,
      rooms: rooms.map((room) => ({
        id: room.id,
        title: room.title,
        subtitle: room.subtitle,
        description: room.description,
        beds: room.beds,
        places: room.places,
        extraBeds: room.extraBeds,
        roomSize: room.roomSize,
        price: room.price,
        conveniences: room.conveniences
          ? room.conveniences.map((convenience) => ({
              id: convenience.id,
              title: convenience.name,
              icon: convenience.icon,
            }))
          : [
              {
                id: room.conveniences[0].id,
                title: room.conveniences[0].name,
                icon: room.conveniences[0].icon,
              },
            ],
      })),
      coords: {
        longitude: hotel.longitude,
        latitude: hotel.latitude,
      },
    };
  }

  async getPrivateHotels(
    page: number,
    limit: number,
    sort: string,
    direction: string,
  ): Promise<HotelListResult[]> {
    const skip = limit * (page - 1);
    const order: { [key: string]: 'ASC' | 'DESC' } = {};

    if (sort === 'popularity') {
      order.hotels = direction as 'ASC' | 'DESC';
    } else if (sort === 'name') {
      order.name = direction as 'ASC' | 'DESC';
    }

    const queryBuilder = this.repository
      .createQueryBuilder('hotel')
      .leftJoinAndSelect('hotel.rooms', 'rooms')
      .leftJoinAndSelect('hotel.conveniences', 'conveniences')
      .leftJoinAndSelect('hotel.landlord', 'landlord')
      .where('landlord.type IN (:...type)', {
        type: [LandlordType.PRIVATE, LandlordType.OTHER],
      })
      .orderBy(order);

    const hotels = await queryBuilder.skip(skip).take(limit).getMany();

    const result = hotels.map(async (hotel) => ({
      id: hotel.id,
      name: hotel.name,
      address: hotel.address,
      img: hotel.image,
      rooms: hotel.rooms.length,
      totalPlaces: await this.countTotalPlaces(hotel.id),
      conveniences: hotel.conveniences,
      cheapestPrice: hotel.cheapestPrice,
      availableHotels: hotels.length,
      totalHotels: hotels.length,
    }));

    return Promise.all(result);
  }

  async findAvailableHotels(
    page: number,
    limit: number,
    sort: string,
    direction: string,
    findBody: FindAvailableHotelsDto,
  ): Promise<HotelListResult[]> {
    const skip = limit * (page - 1);
    const { cityId, checkIn, checkOut, guests } = findBody;
    const checkInDate = checkIn ? new Date(checkIn) : undefined;
    const checkOutDate = checkOut ? new Date(checkOut) : undefined;

    const conflictingOrders = await this.ordersService.getSoldByDates(
      checkInDate,
      checkOutDate,
    );

    const occupiedRoomIds = conflictingOrders.flatMap((order) =>
      order.rooms.map((room) => room.id),
    );

    console.log(occupiedRoomIds);

    const queryBuilder = this.repository
      .createQueryBuilder('hotels')
      .leftJoinAndSelect('hotels.city', 'city')
      .leftJoinAndSelect('hotels.rooms', 'rooms')
      .leftJoinAndSelect('hotels.conveniences', 'conveniences')
      .leftJoinAndSelect('hotels.orders', 'orders')
      .where('hotels.cityId = :cityId', { cityId: cityId })
      .andWhere('rooms.places >= :guests', { guests: guests });

    if (occupiedRoomIds.length > 0) {
      queryBuilder.andWhere('rooms.id NOT IN (:...ids)', {
        ids: occupiedRoomIds,
      });
    }

    const hotels = await queryBuilder.skip(skip).take(limit).getMany();

    const result = hotels.map(async (hotel) => ({
      id: hotel.id,
      name: hotel.name,
      address: hotel.address,
      img: hotel.image,
      rooms: hotel.rooms.length,
      totalPlaces: await this.countTotalPlaces(hotel.id),
      conveniences: hotel.conveniences,
      cheapestPrice: hotel.cheapestPrice,
      availableHotels: hotels.length,
      totalHotels: hotels.length,
    }));

    return Promise.all(result);
  }

  async countTotalPlaces(hotelId: number): Promise<number> {
    let totalPlaces = 0;
    const rooms = await this.roomsService.getByHotelId(hotelId);
    rooms.forEach((room) => {
      totalPlaces += room.places;
    });
    return totalPlaces;
  }
}
