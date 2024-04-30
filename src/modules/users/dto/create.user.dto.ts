import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';
import { UserRole } from '../enums/user.role.enum';

export class CreateUserDto {
  @ApiProperty({ description: 'Имя пользователя', example: 'John' })
  firstName: string;

  @ApiProperty({
    description: 'Электронная почта пользователя',
    example: 'john@example.com',
  })
  email: string;

  @ApiProperty({ description: 'Пароль пользователя', example: 'Password123' })
  @MinLength(8, {
    message: 'Пароль должен содержать минимум 8 символов',
  })
  password: string;

  @ApiProperty({
    description: 'Роль пользователя',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
}
