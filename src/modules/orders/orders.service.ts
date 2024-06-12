import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import {
  DataSource,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { OrderStatus } from './order.statuses';
import { CreateOrderDto } from './dto/create.order.dto';
import { UtilsService } from '../common/utils/utils.service';
import { UpdateOrderDto } from './dto/update.order.dto';
import { RoomsService } from '../rooms/rooms.service';
import { User } from '../users/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
    private readonly roomsService: RoomsService,
    private dataSource: DataSource,
  ) {}

  async getSoldByDates(checkIn: Date, checkOut: Date): Promise<Order[]> {
    return await this.repository.find({
      where: [
        {
          status: In([OrderStatus.PAID, OrderStatus.WAITING_FOR_PAYMENT]),
          checkIn: LessThanOrEqual(checkOut),
          checkOut: MoreThanOrEqual(checkIn),
        },
      ],
      relations: { rooms: true },
    });
  }

  async isRoomAvailable(
    roomId: number,
    checkIn: Date,
    checkOut: Date,
  ): Promise<boolean> {
    const overlappingOrders = await this.repository.find({
      where: [
        {
          rooms: { id: roomId },
          status: OrderStatus.PAID,
          checkIn: LessThanOrEqual(checkOut),
          checkOut: MoreThanOrEqual(checkIn),
        },
        {
          rooms: { id: roomId },
          status: OrderStatus.WAITING_FOR_PAYMENT,
          checkIn: LessThanOrEqual(checkOut),
          checkOut: MoreThanOrEqual(checkIn),
        },
      ],
    });

    return overlappingOrders.length === 0;
  }

  async create(user: User, order: CreateOrderDto): Promise<Order> {
    const isRoomAvailable = await this.isRoomAvailable(
      order.roomId,
      order.checkIn,
      order.checkOut,
    );

    if (!isRoomAvailable) {
      throw new BadRequestException('Номер недоступен на выбранный период дат');
    }

    const room = await this.roomsService.getById(order.roomId);
    if (!room) {
      throw new BadRequestException('Номер не найден');
    }

    const daysCount = UtilsService.differenceInDays(
      order.checkIn,
      order.checkOut,
    );

    const newOrder = new Order();
    newOrder.price = daysCount * room.price;
    newOrder.checkIn = order.checkIn;
    newOrder.checkOut = order.checkOut;
    newOrder.nightsCount = daysCount;
    newOrder.firstName = order.firstName;
    newOrder.lastName = order.lastName;
    newOrder.patronymic = order.patronymic || null;
    newOrder.phone = order.phone;
    newOrder.email = order.email;
    newOrder.guests = order.guests;
    newOrder.status = OrderStatus.WAITING_FOR_PAYMENT;
    newOrder.rooms = [room];
    newOrder.user = user;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const savedOrder = await queryRunner.manager.save(newOrder);
      await queryRunner.commitTransaction();
      return savedOrder;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Ошибка при создании заказа');
    } finally {
      await queryRunner.release();
    }
  }

  async cancelOrder(id: number): Promise<Order> {
    const order = await this.getById(id);
    if (!order) {
      throw new NotFoundException('Заказ не найден');
    }
    if (order.status === OrderStatus.CANCELED) {
      throw new BadRequestException('Заказ уже отменен');
    }
    order.status = OrderStatus.CANCELED;
    return await this.repository.save(order);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.getById(id);
    if (!order) {
      throw new NotFoundException('Заказ не найден');
    }

    if (updateOrderDto.firstName) {
      order.firstName = updateOrderDto.firstName;
    }
    if (updateOrderDto.lastName) {
      order.lastName = updateOrderDto.lastName;
    }
    if (updateOrderDto.patronymic) {
      order.patronymic = updateOrderDto.patronymic;
    }
    if (updateOrderDto.phone) {
      order.phone = updateOrderDto.phone;
    }
    if (updateOrderDto.email) {
      order.email = updateOrderDto.email;
    }

    return await this.repository.save(order);
  }

  async getById(id: number): Promise<Order> {
    return await this.repository.findOne({ where: { id: id } });
  }

  async getByUser(userId: number): Promise<Order[]> {
    return await this.repository.find({
      where: { userId: userId },
    });
  }
}
