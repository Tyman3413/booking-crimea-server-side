import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.user.dto';
import { CreateUserDto } from '../users/dto/create.user.dto';

@Controller('auth')
@ApiTags('Аутентификация 🔑')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Аутентификация пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Успешная аутентификация',
  })
  @ApiResponse({ status: 400, description: 'Некорректные данные пользователя' })
  @ApiBody({
    type: LoginUserDto,
    description: 'Данные пользователя для аутентификации',
  })
  @Post('login')
  async login(@Body() user: LoginUserDto): Promise<{ access_token: string }> {
    return this.authService.login(user);
  }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь зарегистрирован',
    type: Boolean,
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректные данные пользователя',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'Данные пользователя для регистрации',
  })
  @Post('register')
  async register(@Body() user: CreateUserDto): Promise<boolean> {
    return this.authService.register(user);
  }
}
