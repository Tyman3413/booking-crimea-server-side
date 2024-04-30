import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login.user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/dto/create.user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(user: LoginUserDto): Promise<User | undefined> {
    const existingUser = await this.usersService.findOneByEmail(user.email);
    if (existingUser) {
      const isMatch = await bcrypt.compare(
        user.password,
        existingUser.password,
      );
      if (isMatch) {
        return existingUser;
      }
    }
    return undefined;
  }

  async login(user: LoginUserDto): Promise<{ access_token: string }> {
    try {
      const existingUser = await this.validateUser(user);
      const payload = {
        email: existingUser.email,
        sub: existingUser.id,
        role: existingUser.role,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new UnauthorizedException('Неверное имя пользователя или пароль');
    }
  }

  async register(user: CreateUserDto) {
    const existingUser = await this.usersService.findOneByEmail(user.email);
    if (existingUser) {
      throw new ConflictException('Пользователь с таким Email уже существует');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    await this.usersService.create({
      firstName: user.firstName,
      email: user.email,
      password: hashedPassword,
      role: user.role,
    });

    return true;
  }
}
