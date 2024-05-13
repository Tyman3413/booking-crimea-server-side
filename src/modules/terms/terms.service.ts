import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Term } from './term.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TermsService {
  constructor(
    @InjectRepository(Term)
    private readonly repository: Repository<Term>,
  ) {}

  async getByHotelId(hotelId: number) {
    return await this.repository.findOne({
      where: { hotels: { id: hotelId } },
      relations: { hotels: true, habitations: true, registration: true },
    });
  }
}
