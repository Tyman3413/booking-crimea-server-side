import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.user.dto';
import { CreateUserDto } from '../users/dto/create.user.dto';
import { Public } from '../common/decorators/public.decorator';
import { LoginResult } from './dto/login.result';

@Controller('auth')
@ApiTags('Аутентификация 🔑')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Аутентификация пользователя' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Успешная аутентификация',
    type: LoginResult,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Некорректные данные пользователя',
  })
  @ApiBody({
    type: LoginUserDto,
    description: 'Данные пользователя для аутентификации',
  })
  @Public()
  @Post('login')
  async login(@Body() user: LoginUserDto): Promise<LoginResult> {
    return this.authService.login(user);
  }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Пользователь зарегистрирован',
    type: LoginResult,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Некорректные данные пользователя',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'Данные пользователя для регистрации',
  })
  @Public()
  @Post('register')
  async register(@Body() user: CreateUserDto): Promise<LoginResult> {
    return this.authService.register(user);
  }
}
