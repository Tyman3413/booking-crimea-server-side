import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Optional } from '@nestjs/common';

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @Optional()
  patronymic?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  prepayment: boolean;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  checkIn: Date;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  checkOut: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  guests: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  hotelId?: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  roomId: number;
}
