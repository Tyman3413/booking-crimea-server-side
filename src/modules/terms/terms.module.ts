import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Term } from './term.entity';
import { HotelsModule } from '../hotels/hotels.module';

@Module({
  imports: [TypeOrmModule.forFeature([Term]), HotelsModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class TermsModule {}
