import { ApiProperty } from '@nestjs/swagger';

export class PassportResult {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  serialNumber: string;

  @ApiProperty()
  day: number;

  @ApiProperty()
  month: number;

  @ApiProperty()
  year: number;
}
