import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Landlord } from './entities/landlord.entity';
import { ContactPerson } from './entities/contact.person.entity';
import { LandlordSocialLinks } from './entities/landlord.social.links.entity';
import { LandlordsService } from './landlords.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Landlord, ContactPerson, LandlordSocialLinks]),
  ],
  controllers: [],
  providers: [LandlordsService],
  exports: [LandlordsService],
})
export class LandlordsModule {}
