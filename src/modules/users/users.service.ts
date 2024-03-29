import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  // CRUD operations ✏️
  async create(user: CreateUserDto): Promise<void> {
    const existingUser = await this.findOneByEmail(user.email);

    if (!existingUser) {
      const hashedPassword = bcrypt.hashSync(user.password, 10);

      await this.repository.save({
        ...user,
        password: hashedPassword,
      });
    } else {
      throw new ConflictException('Пользователь с таким e-mail уже существует');
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.repository.findOneBy({ email });
  }
}
