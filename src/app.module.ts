import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CountriesModule } from './modules/countries/countries.module';
import { StatesModule } from './modules/states/states.module';
import { CitiesModule } from './modules/cities/cities.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { ConveniencesModule } from './modules/conveniences/conveniences.module';
import { HotelsModule } from './modules/hotels/hotels.module';
import { UsersModule } from './modules/users/users.module';
import { LandlordsModule } from './modules/landlords/landlords.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    /* Core */
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        logging: configService.get<string>('DATABASE_LOGGING') === 'true',
        synchronize:
          configService.get<string>('DATABASE_SYNCHRONIZE') === 'true',
        autoLoadEntities: true,
        autoLoadModels: true,
      }),
      inject: [ConfigService],
    }),
    /* App */
    AuthModule,
    CountriesModule,
    StatesModule,
    CitiesModule,
    UsersModule,
    LandlordsModule,
    HotelsModule,
    ConveniencesModule,
    RoomsModule,
  ],
})
export class AppModule {}
