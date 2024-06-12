import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { FileDetailsDto } from '../../filemanager/dto/file.dto';

export class UpdateHotelDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  conveniences?: number[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  newConvenience?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  contactPhone?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  images: FileDetailsDto[];
}
