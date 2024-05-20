import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrdersService } from './orders.service';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), forwardRef(() => RoomsModule)],
  controllers: [],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
