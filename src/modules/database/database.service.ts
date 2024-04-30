import { Injectable } from '@nestjs/common';
import { CountriesService } from '../countries/countries.service';
import { StatesService } from '../states/states.service';
import { CitiesService } from '../cities/cities.service';
import { Country } from '../countries/country.entity';
import { State } from '../states/state.entity';
import { City } from '../cities/city.entity';
import { LoadDataResponse } from './dto/load.data.response';
import * as fs from 'node:fs';

@Injectable()
export class DatabaseService {
  constructor(
    private readonly countriesService: CountriesService,
    private readonly statesService: StatesService,
    private readonly citiesService: CitiesService,
  ) {}

  async loadCountriesStatesCitiesData(): Promise<LoadDataResponse> {
    let countriesCount = 0;
    let statesCount = 0;
    let citiesCount = 0;
    try {
      const data = JSON.parse(
        fs.readFileSync(
          'src/modules/database/data/countries.states.cities.json',
          'utf8',
        ),
      );

      for (const countryData of data) {
        const country = new Country();
        country.name = countryData.name;
        country.englishName = countryData.englishName;
        country.phoneCode = countryData.phoneCode;
        country.iso2 = countryData.iso2;
        await this.countriesService.create(country);
        countriesCount++;

        for (const stateData of countryData.states) {
          const state = new State();
          state.name = stateData.name;
          state.englishName = stateData.englishName;
          state.country = country;
          await this.statesService.create(state);
          statesCount++;

          for (const cityData of stateData.cities) {
            const city = new City();
            city.name = cityData.name;
            city.englishName = cityData.englishName;
            city.population = cityData.population;
            city.state = state;
            await this.citiesService.create(city);
            citiesCount++;
          }
        }
      }
      return new LoadDataResponse(
        true,
        countriesCount,
        statesCount,
        citiesCount,
      );
    } catch (error) {
      return new LoadDataResponse(
        false,
        countriesCount,
        statesCount,
        citiesCount,
      );
    }
  }
}
