import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habitation } from './habitation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Habitation])],
  controllers: [],
  providers: [],
  exports: [],
})
export class HabitationsModule {}
