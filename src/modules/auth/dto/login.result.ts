import { ApiProperty } from '@nestjs/swagger';

export class LoginResult {
  @ApiProperty()
  access_token: string;
}
