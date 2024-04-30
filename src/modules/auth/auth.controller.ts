import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.user.dto';
import { CreateUserDto } from '../users/dto/create.user.dto';

@Controller('auth')
@ApiTags('Аутентификация 🔑')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: LoginUserDto) {
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }
}
