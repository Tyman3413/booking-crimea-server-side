import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Term } from './term.entity';
import { HotelsModule } from '../hotels/hotels.module';
import { TermsService } from './terms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Term]), forwardRef(() => HotelsModule)],
  controllers: [],
  providers: [TermsService],
  exports: [TermsService],
})
export class TermsModule {}
