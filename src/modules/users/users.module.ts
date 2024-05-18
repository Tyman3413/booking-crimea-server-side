import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ProfilesController } from './profile/profiles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController, ProfilesController],
  providers: [UsersService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
