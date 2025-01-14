import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { OrdersModule } from '../orders/orders.module';
import { RoomsService } from './rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), forwardRef(() => OrdersModule)],
  controllers: [],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
