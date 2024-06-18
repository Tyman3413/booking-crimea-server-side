import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { UserGender } from '../enums/user.gender.enum';
import { CreatePassportDto } from './create.passport.dto';

export class UpdateProfileDto {
  @IsOptional()
  @ApiProperty()
  lastName?: string;

  @IsOptional()
  @ApiProperty()
  nickname?: string;

  @IsOptional()
  @ApiProperty({ type: 'date', example: '1990-05-24' })
  birthday?: Date;

  @IsOptional()
  @ApiProperty()
  gender?: UserGender;

  @IsOptional()
  @ApiProperty()
  phone?: string;

  @IsOptional()
  @ApiProperty()
  address?: string;

  @IsOptional()
  @ApiProperty()
  zipcode?: string;

  @IsOptional()
  @ApiProperty()
  passport?: CreatePassportDto;
}
