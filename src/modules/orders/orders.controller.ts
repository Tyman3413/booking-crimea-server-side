import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create.order.dto';
import { Order } from './order.entity';

@ApiTags('Бронирование 🛎️')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Создание нового бронирования' })
  @Post('create')
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @ApiOperation({ summary: 'Получение информации о бронировании по ID' })
  @Get(':id')
  async getOrderById(@Param('id') id: number): Promise<Order> {
    return this.ordersService.getById(id);
  }
}
