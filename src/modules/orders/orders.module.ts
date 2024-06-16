import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { RoomsModule } from '../rooms/rooms.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { UsersModule } from '../users/users.module';
import { HotelsModule } from '../hotels/hotels.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    forwardRef(() => RoomsModule),
    forwardRef(() => UsersModule),
    forwardRef(() => HotelsModule),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
