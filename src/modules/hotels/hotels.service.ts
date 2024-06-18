import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { In, MoreThanOrEqual, Not, Repository } from 'typeorm';
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
import { Convenience } from '../conveniences/convenience.entity';
import { UserPayload } from '../auth/dto/user.payload';
import { UpdateHotelDto } from './dto/update.hotel.dto';
import { BookmarksService } from '../bookmarks/bookmarks.service';
import { LandlordsService } from '../landlords/landlords.service';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private readonly repository: Repository<Hotel>,
    @Inject(forwardRef(() => ReviewsService))
    private readonly reviewsService: ReviewsService,
    private readonly termsService: TermsService,
    @Inject(forwardRef(() => RoomsService))
    private readonly roomsService: RoomsService,
    @Inject(forwardRef(() => OrdersService))
    private readonly ordersService: OrdersService,
    private readonly conveniencesService: ConveniencesService,
    @Inject(forwardRef(() => BookmarksService))
    private readonly bookmarksService: BookmarksService,
    private readonly landlordsService: LandlordsService,
  ) {}

  async create(user: UserPayload, body: CreateHotelDto) {
    const landlord = await this.landlordsService.getByUser(user.id);
    const hotel = new Hotel();
    hotel.name = body.name;
    hotel.address = body.address;
    hotel.cheapestPrice = body.price;
    hotel.description = body.description;
    hotel.landlord = landlord;

    if (body.conveniences && body.conveniences.length > 0) {
      hotel.conveniences = await this.conveniencesService.findAllByIds(
        body.conveniences,
      );
    }

    if (body.newConvenience) {
      const newConvenienceNames = body.newConvenience.split(', ');

      const newConveniences = await Promise.all(
        newConvenienceNames.map(async (name) => {
          const convenience = new Convenience();
          convenience.name = name;
          convenience.userId = user.id;
          return await this.conveniencesService.create(convenience);
        }),
      );

      hotel.conveniences = [...(hotel.conveniences || []), ...newConveniences];
    }

    const result = this.repository.create(hotel);
    await this.repository.save(result);
  }

  async update(
    id: number,
    user: UserPayload,
    body: UpdateHotelDto,
  ): Promise<Hotel> {
    const hotel = await this.repository.findOne({
      where: { id: id },
      relations: { conveniences: true },
    });
    if (!hotel) {
      throw new NotFoundException('Отель не найден');
    }

    if (body.name) {
      hotel.name = body.name;
    }
    if (body.address) {
      hotel.address = body.address;
    }
    if (body.price) {
      hotel.cheapestPrice = body.price;
    }
    if (body.description) {
      hotel.description = body.description;
    }
    if (body.conveniences && body.conveniences.length > 0) {
      hotel.conveniences = await this.conveniencesService.findAllByIds(
        body.conveniences,
      );
    }
    if (body.newConvenience) {
      const newConvenienceNames = body.newConvenience.split(', ');

      const newConveniences = await Promise.all(
        newConvenienceNames.map(async (name) => {
          const convenience = new Convenience();
          convenience.name = name;
          convenience.userId = user.id;
          return await this.conveniencesService.create(convenience);
        }),
      );

      hotel.conveniences = [...(hotel.conveniences || []), ...newConveniences];
    }

    return await this.repository.save(hotel);
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
      order['rating'] = direction as 'ASC' | 'DESC';
    } else if (sort === 'name') {
      order['name'] = direction as 'ASC' | 'DESC';
    }

    const where: any = { landlord: { type: LandlordType.COMPANY } };
    if (cityId) {
      where.cityId = cityId;
    }

    const [hotels, total] = await this.repository.findAndCount({
      where: where,
      relations: {
        rooms: true,
        conveniences: true,
        landlord: true,
        hotelImages: true,
      },
      order: order,
      skip: skip,
      take: limit,
    });

    const result = hotels.map(async (hotel) => ({
      id: hotel.id,
      name: hotel.name,
      address: hotel.address,
      img: hotel.image,
      tempImages: hotel.hotelImages,
      rooms: hotel.rooms.length,
      totalPlaces: await this.countTotalPlaces(hotel.id),
      conveniences: hotel.conveniences,
      cheapestPrice: hotel.cheapestPrice,
      availableHotels: hotels.length,
      totalHotels: total,
    }));

    return Promise.all(result);
  }

  async getHotelById(
    id: number,
    user?: UserPayload,
  ): Promise<HotelDetailsResult> {
    let isBookmarkExists = false;
    const hotel = await this.repository.findOne({
      where: { id: id },
      relations: {
        city: true,
        conveniences: true,
        term: { registration: true, habitations: true },
        rooms: true,
        reviews: true,
        hotelImages: true,
      },
    });

    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }

    const reviews = await this.reviewsService.getReviewsByHotelId(hotel.id);
    const terms = await this.termsService.getByHotelId(hotel.id);
    const rooms = await this.roomsService.getByHotelId(hotel.id);

    if (user) {
      const bookmark =
        (await this.bookmarksService.isBookmarkExist(user.id, id)) || null;
      isBookmarkExists = !!bookmark;
    }

    const termDetails: TermsDetailsResult = {
      id: terms.id,
      prepaymentPercentage: terms.prepaymentPercentage,
      reservationCancel: terms.reservationCancel,
      registration: terms.registration,
      habitations: terms.habitations.map((habitation) => ({
        id: habitation.id,
        rule: habitation.rule,
        icon: habitation.icon,
      })),
    };

    return {
      id: hotel.id,
      title: hotel.name,
      tempImages: hotel.hotelImages,
      file: hotel.thumbnail,
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
        tempImages: room.roomImages,
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
      isBookmark: isBookmarkExists ? isBookmarkExists : false,
    };
  }

  async getPrivateHotels(
    page: number,
    limit: number,
    sort: string,
    direction: string,
    cityId?: number,
  ): Promise<HotelListResult[]> {
    const skip = limit * (page - 1);
    const order: { [key: string]: 'ASC' | 'DESC' } = {};

    if (sort === 'popularity') {
      order['rating'] = direction as 'ASC' | 'DESC';
    } else if (sort === 'name') {
      order['name'] = direction as 'ASC' | 'DESC';
    }

    const where: any = {
      landlord: { type: In([LandlordType.PRIVATE, LandlordType.OTHER]) },
    };
    if (cityId) {
      where.cityId = cityId;
    }

    const [hotels, total] = await this.repository.findAndCount({
      where: where,
      relations: {
        rooms: true,
        conveniences: true,
        landlord: true,
        hotelImages: true,
      },
      order: order,
      skip: skip,
      take: limit,
    });

    const result = hotels.map(async (hotel) => ({
      id: hotel.id,
      name: hotel.name,
      address: hotel.address,
      img: hotel.image,
      tempImages: hotel.hotelImages,
      rooms: hotel.rooms.length,
      totalPlaces: await this.countTotalPlaces(hotel.id),
      conveniences: hotel.conveniences,
      cheapestPrice: hotel.cheapestPrice,
      availableHotels: hotels.length,
      totalHotels: total,
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
    console.log(conflictingOrders);

    const occupiedRoomIds = conflictingOrders.flatMap((order) =>
      order.rooms.map((room) => room.id),
    );

    console.log(occupiedRoomIds);

    const order: { [key: string]: 'ASC' | 'DESC' } = {};
    if (sort === 'popularity') {
      order['rating'] = direction as 'ASC' | 'DESC';
    } else if (sort === 'name') {
      order['name'] = direction as 'ASC' | 'DESC';
    }

    const where: any = {
      cityId,
      rooms: {
        places: MoreThanOrEqual(guests),
      },
    };
    if (occupiedRoomIds.length > 0) {
      where.rooms.id = Not(In(occupiedRoomIds));
    }
    console.log(where);

    const [hotels, total] = await this.repository.findAndCount({
      where: where,
      relations: {
        city: true,
        rooms: true,
        conveniences: true,
        orders: true,
        hotelImages: true,
      },
      order: order,
      skip: skip,
      take: limit,
    });

    console.log(hotels);

    const result = hotels.map(async (hotel) => ({
      id: hotel.id,
      name: hotel.name,
      address: hotel.address,
      img: hotel.image,
      tempImages: hotel.hotelImages,
      rooms: hotel.rooms.length,
      totalPlaces: await this.countTotalPlaces(hotel.id),
      conveniences: hotel.conveniences,
      cheapestPrice: hotel.cheapestPrice,
      availableHotels: hotels.length,
      totalHotels: total,
    }));

    return Promise.all(result);
  }

  async getLandlordHotels(
    user: UserPayload,
    page: number,
    limit: number,
    sort: string,
    direction: string,
  ): Promise<HotelListResult[]> {
    const skip = limit * (page - 1);
    const order: { [key: string]: 'ASC' | 'DESC' } = {};

    if (sort === 'popularity') {
      order['rating'] = direction as 'ASC' | 'DESC';
    } else if (sort === 'name') {
      order['name'] = direction as 'ASC' | 'DESC';
    }

    const landlord = await this.landlordsService.getByUser(user.id);
    if (!landlord) {
      throw new NotFoundException('Вы не арендодатель');
    }

    const where: any = {
      landlordId: landlord.id,
    };

    const [hotels, total] = await this.repository.findAndCount({
      where: where,
      relations: {
        rooms: true,
        conveniences: true,
        landlord: true,
        hotelImages: true,
      },
      order: order,
      skip: skip,
      take: limit,
    });

    const result = hotels.map(async (hotel) => ({
      id: hotel.id,
      name: hotel.name,
      address: hotel.address,
      img: hotel.image,
      tempImages: hotel.hotelImages,
      rooms: hotel.rooms.length,
      totalPlaces: await this.countTotalPlaces(hotel.id),
      conveniences: hotel.conveniences,
      cheapestPrice: hotel.cheapestPrice,
      availableHotels: hotels.length,
      totalHotels: total,
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

  async findOne(id: number): Promise<Hotel> {
    return await this.repository.findOne({ where: { id: id } });
  }

  async findByIds(ids: number[]): Promise<Hotel[]> {
    return await this.repository.find({
      where: { id: In(ids) },
      relations: {
        hotelImages: true,
        rooms: true,
        conveniences: true,
      },
    });
  }
}
