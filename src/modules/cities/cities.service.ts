import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './city.entity';
import { CitiesResult } from './dto/cities.result';
import { HotelsResult } from '../hotels/dto/hotels.result';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private readonly repository: Repository<City>,
  ) {}

  async create(city: City) {
    const existingCity = await this.repository.findOne({
      where: { englishName: city.englishName },
    });
    if (!existingCity) return await this.repository.save(city);
  }

  async findAll(
    page: number,
    limit: number,
    sort: string,
    direction: string,
    search?: string,
  ): Promise<CitiesResult[]> {
    const skip = limit * (page - 1);

    const queryBuilder = this.repository
      .createQueryBuilder('city')
      .leftJoinAndSelect('city.hotels', 'hotels')
      .orderBy(`city.${sort}`, direction as 'ASC' | 'DESC');

    if (search) {
      queryBuilder.where('LOWER(city.name) LIKE :search', {
        search: `${search.toLowerCase()}%`,
      });
    }

    const cities = await queryBuilder.skip(skip).take(limit).getMany();

    return cities.map((city) => {
      const hotelsResult: HotelsResult[] = city.hotels.map((hotel) => ({
        id: hotel.id,
        img: hotel.image,
        name: hotel.name,
        address: hotel.address,
        cheapestPrice: hotel.cheapestPrice,
      }));

      return {
        id: city.id,
        title: city.name,
        description: city.description,
        img: city.photo,
        hotels: hotelsResult,
        totalHotels: city.hotels.length,
      };
    });
  }
}
