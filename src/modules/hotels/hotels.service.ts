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

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private readonly repository: Repository<Hotel>,
    private readonly reviewsService: ReviewsService,
    private readonly termsService: TermsService,
    private readonly roomsService: RoomsService,
  ) {}

  async getHotelsByCityId(
    page: number,
    limit: number,
    cityId?: number,
  ): Promise<HotelListResult[]> {
    const skip = limit * (page - 1);

    let queryBuilder = this.repository
      .createQueryBuilder('hotel')
      .leftJoinAndSelect('hotel.rooms', 'rooms')
      .leftJoinAndSelect('hotel.conveniences', 'conveniences');
    if (cityId) {
      queryBuilder = queryBuilder.where('hotel.cityId = :cityId', { cityId });
    }
    const hotels = await queryBuilder.skip(skip).take(limit).getMany();

    const result = hotels.map(async (hotel) => ({
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

  async countTotalPlaces(hotelId: number): Promise<number> {
    let totalPlaces = 0;
    const rooms = await this.roomsService.getByHotelId(hotelId);
    rooms.forEach((room) => {
      totalPlaces += room.places;
    });
    return totalPlaces;
  }
}
