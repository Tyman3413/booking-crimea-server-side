import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './country.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly repository: Repository<Country>,
  ) {}

  async create(country: Country) {
    const existingCountry = await this.repository.findOne({
      where: { englishName: country.englishName },
    });
    if (!existingCountry) return await this.repository.save(country);
  }
}
