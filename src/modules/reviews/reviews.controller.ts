import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CurrentUser } from '../users/decorators/user.decorator';
import { UserPayload } from '../auth/dto/user.payload';
import { CreateReviewDto } from './dto/create.review.dto';

@ApiTags('Отзывы ⭐')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async create(
    @CurrentUser() user: UserPayload,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return await this.reviewsService.create(user, createReviewDto);
  }
}
