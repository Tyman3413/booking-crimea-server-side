import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ProfilesController } from './profile/profiles.controller';
import { ReviewsModule } from '../reviews/reviews.module';
import { LandlordsModule } from '../landlords/landlords.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => ReviewsModule),
    forwardRef(() => LandlordsModule),
  ],
  controllers: [UsersController, ProfilesController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
