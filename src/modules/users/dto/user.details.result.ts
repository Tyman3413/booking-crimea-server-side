import { ApiProperty } from '@nestjs/swagger';
import { UserGender } from '../enums/user.gender.enum';
import { Country } from '../../countries/country.entity';

export class UserDetailsResult {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  birthday: Date;

  @ApiProperty()
  gender: UserGender;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  country: Country;

  @ApiProperty()
  address: string;

  @ApiProperty()
  zipcode: string;

  @ApiProperty()
  timezone: string;

  @ApiProperty()
  passport: string;

  @ApiProperty()
  preferredCurrency: string;

  @ApiProperty()
  preferredLanguage: string;

  @ApiProperty()
  dateJoined: Date;
}
