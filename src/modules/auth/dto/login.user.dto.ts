import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'Электронная почта пользователя',
    example: 'john@example.com',
  })
  @IsEmail({}, { message: 'Некорректный формат электронной почты' })
  @IsNotEmpty({ message: 'Электронная почта является обязательной' })
  email: string;

  @ApiProperty({ description: 'Пароль пользователя', example: 'Password123' })
  @IsNotEmpty({ message: 'Пароль не должен быть пустым' })
  @MinLength(8, { message: 'Длина пароля должна быть больше 8 символов' })
  password: string;
}
