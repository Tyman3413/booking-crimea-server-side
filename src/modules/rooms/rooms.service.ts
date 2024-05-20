import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { Repository } from 'typeorm';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly repository: Repository<Room>,
    private readonly ordersService: OrdersService,
  ) {}

  async getByHotelId(hotelId: number): Promise<Room[]> {
    return await this.repository.find({
      where: { hotelId: hotelId },
      relations: { conveniences: true },
    });
  }

  async checkAvailabilityByHotelId(
    hotelId: number,
    checkIn: Date,
    checkOut: Date,
  ): Promise<Room[]> {
    const rooms = await this.getByHotelId(hotelId);
    const orders = await this.ordersService.getSoldByDates(checkIn, checkOut);

    return rooms.filter((room) => {
      const overlappingOrder = orders.find((order) => {
        return order.rooms.some((orderRoom) => orderRoom.id === room.id);
      });

      return !overlappingOrder;
    });
  }

  async getById(id: number): Promise<Room> {
    return await this.repository.findOne({ where: { id: id } });
  }
}
