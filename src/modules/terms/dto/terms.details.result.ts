import { ApiProperty } from '@nestjs/swagger';
import { RegistrationDetailsResult } from '../../registrations/dto/registration.details.result';
import { HabitationDetailsResult } from '../../habitations/dto/habitation.details.result';

export class TermsDetailsResult {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 10 })
  prepaymentPercentage: number;

  @ApiProperty({ example: 'За 15 дней' })
  reservationCancel: string;

  @ApiProperty({ type: RegistrationDetailsResult })
  registration: RegistrationDetailsResult;

  @ApiProperty({ type: () => HabitationDetailsResult, isArray: true })
  habitations: HabitationDetailsResult[];
}
