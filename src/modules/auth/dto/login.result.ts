import { ApiProperty } from '@nestjs/swagger';

export class LoginResult {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIs..',
  })
  access_token: string;
}
