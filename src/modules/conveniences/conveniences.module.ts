import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Convenience } from './convenience.entity';
import { ConveniencesController } from './conveniences.controller';
import { ConveniencesService } from './conveniences.service';

@Module({
  imports: [TypeOrmModule.forFeature([Convenience])],
  controllers: [ConveniencesController],
  providers: [ConveniencesService],
  exports: [ConveniencesService],
})
export class ConveniencesModule {}
