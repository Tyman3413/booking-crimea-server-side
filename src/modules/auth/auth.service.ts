import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login.user.dto';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/dto/create.user.dto';
import { LoginResult } from './dto/login.result';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
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

  async login(user: LoginUserDto): Promise<LoginResult> {
    try {
      const existingUser = await this.validateUser(user);
      const payload = this.getJwtPayload(existingUser);
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      this.logger.error(`Ошибка аутентификации: ${error.message}`);
      throw new UnauthorizedException('Неверное имя пользователя или пароль');
    }
  }

  async register(user: CreateUserDto): Promise<LoginResult> {
    const existingUser = await this.usersService.findOneByEmail(user.email);
    if (existingUser) {
      throw new ConflictException('Пользователь с таким Email уже существует');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    try {
      const newUser = await this.usersService.create({
        firstName: user.firstName,
        email: user.email,
        password: hashedPassword,
        role: user.role,
      });
      const payload = this.getJwtPayload(newUser);
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      this.logger.error(`Ошибка регистрации: ${error.message}`);
    }
  }

  private getJwtPayload(user: User): any {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
