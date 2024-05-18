import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrdersService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
