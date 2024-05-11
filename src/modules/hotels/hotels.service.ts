import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { Repository } from 'typeorm';
import { HotelListResult } from './hotel.list.result';
import { HotelDetailsResult } from './dto/hotel.details.result';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private readonly repository: Repository<Hotel>,
  ) {}

  async getHotelsByCityId(
    page: number,
    limit: number,
    cityId?: number,
  ): Promise<HotelListResult[]> {
    const skip = limit * (page - 1);

    let queryBuilder = this.repository
      .createQueryBuilder('hotel')
      .leftJoinAndSelect('hotel.rooms', 'rooms');

    if (cityId) {
      queryBuilder = queryBuilder.where('hotel.cityId = :cityId', { cityId });
    }

    const hotels = await queryBuilder.skip(skip).take(limit).getMany();

    return hotels.map((hotel) => ({
      name: hotel.name,
      address: hotel.address,
      rooms: hotel.rooms.length,
      totalPlaces: hotel.rooms.length, // TODO
      conveniences: hotel.conveniences,
      cheapestPrice: hotel.cheapestPrice,
      availableHotels: hotels.length, // TODO
      totalHotels: hotels.length,
    }));
  }

  async getHotelById(id: number): Promise<Hotel> {
    const hotel = await this.repository.findOne({
      where: { id: id },
      relations: {
        city: true,
        conveniences: true,
        term: { registration: true, habitations: true },
        rooms: true,
      },
    });

    return hotel;
  }
}
