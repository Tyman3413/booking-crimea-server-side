import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../../users/dto/create.user.dto';
import { User } from '../../users/user.entity';
import { LoginUserDto } from '../dto/login.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() user: CreateUserDto): Promise<void> {
    return await this.authService.register(user);
  }

  @Post('login')
  async login(@Body() user: LoginUserDto): Promise<{ access_token: string }> {
    return await this.authService.login(user);
  }
}
