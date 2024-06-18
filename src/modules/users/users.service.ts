import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateProfileDto } from './dto/update.profile.dto';
import { UserDetailsResult } from './dto/user.details.result';
import { LandlordsService } from '../landlords/landlords.service';
import { UserRole } from './enums/user.role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly landlordsService: LandlordsService,
  ) {}

  // CRUD operations ✏️
  async create(user: CreateUserDto): Promise<User> {
    return await this.repository.save(user);
  }

  async updateProfile(user: User, data: UpdateProfileDto): Promise<User> {
    if (data.passport && !user.passport) {
      await this.landlordsService.createByUser(user);
      if (user.role !== UserRole.ADMIN) {
        user.role = UserRole.LANDLORD;
      } else {
        user.role = user.role;
      }
    }
    await this.repository.update(user.id, { ...data, role: user.role });
    return await this.findOneByEmail(user.email);
  }

  async getProfile(user: User): Promise<UserDetailsResult> {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      nickname: user.nickname,
      birthday: user.birthday,
      gender: user.gender,
      phone: user.phone,
      country: user.country,
      address: user.address,
      zipcode: user.zipcode,
      timezone: user.timezone,
      passport: user.passport,
      preferredCurrency: user.preferredCurrency,
      preferredLanguage: user.preferredLanguage,
      dateJoined: user.dateJoined,
    };
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.repository.findOne({
      where: { email: email },
      relations: { country: true },
    });
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }
}
