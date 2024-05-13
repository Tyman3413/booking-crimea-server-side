import { ApiProperty } from '@nestjs/swagger';

export class HabitationDetailsResult {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Курение запрещено' })
  rule: string;
}