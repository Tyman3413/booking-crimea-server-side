import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { OrderStatus } from './order.statuses';
import { CreateOrderDto } from './dto/create.order.dto';
import { RoomsService } from '../rooms/rooms.service';
import { UtilsService } from '../common/utils/utils.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
    // private readonly roomsService: RoomsService,
  ) {}

  async getSoldByDates(checkIn: Date, checkOut: Date): Promise<Order[]> {
    return await this.repository.find({
      where: [
        {
          status: OrderStatus.PAID,
          checkIn: LessThanOrEqual(checkOut),
          checkOut: MoreThanOrEqual(checkIn),
        },
      ],
      relations: { rooms: true },
    });
  }

  async create(order: CreateOrderDto): Promise<Order> {
    // const isRoomAvailable = await this.roomsService.isRoomAvailable(
    //   order.roomId,
    //   order.checkIn,
    //   order.checkOut,
    // );

    // if (!isRoomAvailable) {
    //   throw new BadRequestException('Номер недоступен на выбранный период дат');
    // }

    // const room = await this.roomsService.getById(order.roomId);
    // if (!room) {
    //   throw new BadRequestException('Номер не найден');
    // }
    const daysCount = UtilsService.differenceInDays(
      order.checkIn,
      order.checkOut,
    );

    const newOrder = new Order();
    // newOrder.price = daysCount * room.price;
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

    return this.repository.save(order);
  }

  async getById(id: number): Promise<Order> {
    return await this.repository.findOne({ where: { id: id } });
  }
}
