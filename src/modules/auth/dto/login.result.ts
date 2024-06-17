import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../users/enums/user.role.enum';

export class LoginResult {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIs..',
  })
  access_token: string;

  @ApiProperty({ example: UserRole.USER })
  role: UserRole;
}
