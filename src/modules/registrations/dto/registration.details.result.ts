import { ApiProperty } from '@nestjs/swagger';

export class RegistrationDetailsResult {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '14:00:00' })
  arrivalTime: string;

  @ApiProperty({ example: '12:00:00' })
  departureTime: string;
}
