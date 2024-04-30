import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  // CRUD operations ✏️
  async create(user: CreateUserDto): Promise<User> {
    return await this.repository.save(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.repository.findOneBy({ email });
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }
}
