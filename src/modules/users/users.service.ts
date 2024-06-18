import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateProfileDto } from './dto/update.profile.dto';
import { UserDetailsResult } from './dto/user.details.result';
import { LandlordsService } from '../landlords/landlords.service';
import { UserRole } from './enums/user.role.enum';
import { PassportEntity } from './passport.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    @InjectRepository(PassportEntity)
    private readonly passportRepository: Repository<PassportEntity>,
    private readonly landlordsService: LandlordsService,
  ) {}

  // CRUD operations ✏️
  async create(user: CreateUserDto): Promise<User> {
    return await this.repository.save(user);
  }

  async updateProfile(user: User, data: UpdateProfileDto): Promise<User> {
    if (data.passport) {
      if (!user.passport) {
        const passport = new PassportEntity();
        passport.lastName = data.passport.lastName
          ? data.passport.lastName
          : null;
        passport.firstName = data.passport.firstName
          ? data.passport.firstName
          : null;
        passport.country = data.passport.country ? data.passport.country : null;
        passport.serialNumber = data.passport.serialNumber
          ? data.passport.serialNumber
          : null;
        passport.day = data.passport.day ? data.passport.day : null;
        passport.month = data.passport.month ? data.passport.month : null;
        passport.year = data.passport.year ? data.passport.year : null;
        passport.user = user;
        await this.passportRepository.save(passport);
        const landlord = await this.landlordsService.getByUser(user.id);
        if (!landlord) {
          await this.landlordsService.createByUser(user);
        }

        if (user.role !== UserRole.ADMIN) {
          user.role = UserRole.LANDLORD;
        } else {
          user.role = user.role;
        }
      } else {
        user.passport.lastName =
          data.passport.lastName || user.passport.lastName;
        user.passport.firstName =
          data.passport.firstName || user.passport.firstName;
        user.passport.country = data.passport.country || user.passport.country;
        user.passport.serialNumber =
          data.passport.serialNumber || user.passport.serialNumber;
        user.passport.day = data.passport.day || user.passport.day;
        user.passport.month = data.passport.month || user.passport.month;
        user.passport.year = data.passport.year || user.passport.year;
        await this.passportRepository.save(user.passport);
      }
    }
    const existingUser = await this.findOneByEmail(user.email);
    if (data.lastName) {
      existingUser.lastName = data.lastName;
    }
    if (data.nickname) {
      existingUser.nickname = data.nickname;
    }
    if (data.birthday) {
      existingUser.birthday = data.birthday;
    }
    if (data.gender) {
      existingUser.gender = data.gender;
    }
    if (data.phone) {
      existingUser.phone = data.phone;
    }
    if (data.address) {
      existingUser.address = data.address;
    }
    if (data.zipcode) {
      existingUser.zipcode = data.zipcode;
    }
    await this.repository.save(existingUser);
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
      relations: { country: true, passport: true },
    });
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }
}
