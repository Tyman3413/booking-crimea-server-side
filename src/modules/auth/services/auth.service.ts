import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import { LoginUserDto } from '../dto/login.user.dto';
import { User } from '../../users/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../../users/dto/create.user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validate(loginUserDto: LoginUserDto): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(loginUserDto.email);

    if (user && bcrypt.compareSync(loginUserDto.password, user.password)) {
      return user;
    }

    return null;
  }

  async register(user: CreateUserDto): Promise<void> {
    return await this.usersService.create(user);
  }

  async login(loginUser: LoginUserDto): Promise<{ access_token: string }> {
    const user = await this.validate(loginUser);

    if (!user) {
      throw new UnauthorizedException('Неверные данные');
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
