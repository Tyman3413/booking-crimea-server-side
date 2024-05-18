import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { OrderStatus } from './order.statuses';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
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
}
