import { ApiProperty } from '@nestjs/swagger';

export class LoadDataResponse {
  constructor(success, countriesLoaded, statesLoaded, citiesLoaded) {
    this.success = success;
    this.countriesLoaded = countriesLoaded;
    this.statesLoaded = statesLoaded;
    this.citiesLoaded = citiesLoaded;
  }

  @ApiProperty()
  success: boolean;

  @ApiProperty()
  countriesLoaded: number;

  @ApiProperty()
  statesLoaded: number;

  @ApiProperty()
  citiesLoaded: number;
}
