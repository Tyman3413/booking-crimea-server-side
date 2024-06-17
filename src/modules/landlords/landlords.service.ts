import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Landlord } from './entities/landlord.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { LandlordStatus } from './landlord.status.enum';
import { LandlordType } from './landlord.type.enum';

@Injectable()
export class LandlordsService {
  constructor(
    @InjectRepository(Landlord)
    private readonly repository: Repository<Landlord>,
  ) {}

  async createByUser(user: User): Promise<Landlord> {
    const landlord = new Landlord();
    landlord.user = user;
    landlord.status = LandlordStatus.APPROVED;
    landlord.type = LandlordType.PRIVATE;
    landlord.companyName = user.firstName;
    return await this.repository.save(landlord);
  }
}
