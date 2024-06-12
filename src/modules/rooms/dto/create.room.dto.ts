import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { FileDetailsDto } from '../../filemanager/dto/file.dto';

export class CreateRoomDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  subtitle: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  beds: number;

  @ApiProperty()
  @IsNumber()
  places: number;

  @ApiProperty()
  @IsNumber()
  extraBeds: number;

  @ApiProperty()
  @IsNumber()
  roomSize: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  photos?: FileDetailsDto[];

  @ApiProperty()
  @IsNumber()
  hotelId: number;

  @ApiProperty()
  conveniences: number[];

  @ApiProperty()
  newConvenience?: string;
}
