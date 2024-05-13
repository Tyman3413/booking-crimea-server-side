import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly repository: Repository<Review>,
  ) {}

  async getReviewsByHotelId(hotelId: number): Promise<Review[]> {
    return await this.repository.find({
      where: { hotelId: hotelId },
      relations: { user: true },
    });
  }
}
