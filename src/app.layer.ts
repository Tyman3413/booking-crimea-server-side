import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CitiesModule } from './modules/cities/cities.module';
import { ConveniencesModule } from './modules/conveniences/conveniences.module';
import { CountriesModule } from './modules/countries/countries.module';
import { HabitationsModule } from './modules/habitations/habitations.module';
import { HotelsModule } from './modules/hotels/hotels.module';
import { LandlordsModule } from './modules/landlords/landlords.module';
import { OrdersModule } from './modules/orders/orders.module';
import { RegistrationsModule } from './modules/registrations/registrations.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { StatesModule } from './modules/states/states.module';
import { TermsModule } from './modules/terms/terms.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './modules/database/database.module';

export const APP_LAYER = [
  AuthModule,
  CategoriesModule,
  CitiesModule,
  ConveniencesModule,
  CountriesModule,
  DatabaseModule,
  HabitationsModule,
  HotelsModule,
  LandlordsModule,
  OrdersModule,
  RegistrationsModule,
  ReviewsModule,
  RoomsModule,
  StatesModule,
  TermsModule,
  UsersModule,
];
