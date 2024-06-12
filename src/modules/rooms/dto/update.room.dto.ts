import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { FileDetailsDto } from '../../filemanager/dto/file.dto';

export class UpdateRoomDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  subtitle?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  beds?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  places?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  extraBeds?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  roomSize?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  photos?: FileDetailsDto[];

  @ApiProperty()
  @IsOptional()
  conveniences?: number[];

  @ApiProperty()
  @IsOptional()
  newConvenience?: string;
}
