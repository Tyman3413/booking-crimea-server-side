import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'Электронная почта существующего пользователя',
    example: 'john@example.com',
  })
  @IsEmail({}, { message: 'Некорректный формат электронной почты' })
  @IsNotEmpty({ message: 'Электронная почта является обязательной' })
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  newPassword: string;
}
