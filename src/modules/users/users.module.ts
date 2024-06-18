import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ProfilesController } from './profile/profiles.controller';
import { ReviewsModule } from '../reviews/reviews.module';
import { LandlordsModule } from '../landlords/landlords.module';
import { PassportEntity } from './passport.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, PassportEntity]),
    forwardRef(() => ReviewsModule),
    forwardRef(() => LandlordsModule),
  ],
  controllers: [UsersController, ProfilesController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
