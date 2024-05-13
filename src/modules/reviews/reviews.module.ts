import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { ReviewsService } from './reviews.service';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  controllers: [],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
