import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create.order.dto';
import { Order } from './order.entity';
import { UpdateOrderDto } from './dto/update.order.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../users/decorators/user.decorator';
import { UserPayload } from '../auth/dto/user.payload';
import { UsersService } from '../users/users.service';

@ApiTags('Бронирование 🛎️')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Создание нового бронирования' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createOrder(
    @CurrentUser() user: UserPayload,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    const existingUser = await this.usersService.findOneByEmail(user.email);
    if (!existingUser) {
      throw new BadRequestException('Пользователь не найден');
    }
    return await this.ordersService.create(existingUser, createOrderDto);
  }

  @ApiOperation({ summary: 'Получение информации о бронировании по ID' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getOrderById(@Param('id') id: number): Promise<Order> {
    return await this.ordersService.getById(id);
  }

  @ApiOperation({
    summary: 'Получить список бронирований аутентифицированного пользователя',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/my')
  async getOrdersForCurrentUser(
    @CurrentUser() user: UserPayload,
  ): Promise<Order[]> {
    return await this.ordersService.getByUser(user.id);
  }

  @ApiOperation({ summary: 'Обновление деталей заказа' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('update/:id')
  async updateOrder(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return await this.ordersService.update(id, updateOrderDto);
  }

  @ApiOperation({ summary: 'Отмена заказа' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('cancel/:id')
  async cancelOrder(@Param('id') id: number): Promise<Order> {
    return await this.ordersService.cancelOrder(id);
  }
}
