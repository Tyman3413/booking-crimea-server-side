import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create.review.dto';
import { UserPayload } from '../auth/dto/user.payload';
import { HotelsService } from '../hotels/hotels.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly repository: Repository<Review>,
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => HotelsService))
    private readonly hotelsService: HotelsService,
  ) {}

  async create(
    user: UserPayload,
    createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    const existingUser = await this.usersService.findOneByEmail(user.email);
    if (existingUser) {
      const hotel = await this.hotelsService.getHotelById(
        createReviewDto.hotelId,
      );
      if (!hotel) {
        throw new NotFoundException(`Отель не найден`);
      }
      const review = new Review();
      review.comment = createReviewDto.comment;
      review.rating = createReviewDto.rating;
      review.daysSpent = null; // TODO
      review.hotelId = hotel.id;
      review.user = existingUser;

      return await this.repository.save(review);
    }
  }

  async getReviewsByHotelId(hotelId: number): Promise<Review[]> {
    return await this.repository.find({
      where: { hotelId: hotelId },
      relations: { user: true },
    });
  }
}
