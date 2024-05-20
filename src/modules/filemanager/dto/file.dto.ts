import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

interface IFileDetails {
  originalName: string;
  fileName: string;
  size: number;
}

export interface IFileDetailsS3 {
  ETag: string;
  Location: string;
  Key: string;
  Bucket: string;
}

export class FileDetailsDto {
  constructor(data: IFileDetails) {
    if (data) {
      this.originalName = data.originalName;
      this.fileName = data.fileName;
      this.size = data.size;
    }
  }

  @ApiProperty()
  @IsString()
  originalName: string;

  @ApiProperty()
  @IsString()
  fileName: string;

  @ApiProperty()
  @IsNumber()
  size: number;
}

export class FileDetailsS3Dto {
  constructor(data: IFileDetailsS3) {
    if (data) {
      this.ETag = data.ETag;
      this.Location = data.Location;
      this.Key = data.Key;
      this.Bucket = data.Bucket;
    }
  }

  @ApiProperty()
  @IsString()
  ETag: string;

  @ApiProperty()
  @IsString()
  Location: string;

  @ApiProperty()
  @IsNumber()
  Key: string;

  @ApiProperty()
  @IsNumber()
  Bucket: string;
}
