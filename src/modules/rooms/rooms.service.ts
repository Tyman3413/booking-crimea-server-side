import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly repository: Repository<Room>,
  ) {}

  async getByHotelId(hotelId: number): Promise<Room[]> {
    return await this.repository.find({
      where: { hotelId: hotelId },
      relations: { conveniences: true },
    });
  }
}
