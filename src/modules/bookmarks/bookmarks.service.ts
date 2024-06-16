import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from './bookmark.entity';
import { Repository } from 'typeorm';
import { UserPayload } from '../auth/dto/user.payload';
import { UsersService } from '../users/users.service';
import { HotelsService } from '../hotels/hotels.service';
import { HotelListResult } from '../hotels/hotel.list.result';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly repository: Repository<Bookmark>,
    private readonly usersService: UsersService,
    private readonly hotelsService: HotelsService,
  ) {}

  async create(user: UserPayload, hotelId: number): Promise<Bookmark> {
    const existingUser = await this.usersService.findOneByEmail(user.email);
    if (!existingUser) {
      throw new NotFoundException('Пользователь не найден');
    }
    const existingHotel = await this.hotelsService.findOne(hotelId);
    if (!existingHotel) {
      throw new NotFoundException('Отель не найден');
    }
    const existingBookmark = await this.isBookmarkExist(
      existingUser.id,
      hotelId,
    );
    if (existingBookmark) {
      throw new ConflictException('Загладка уже добавлена');
    }
    const bookmark = new Bookmark();
    bookmark.hotelId = hotelId;
    bookmark.userId = existingUser.id;

    const newBookmark = this.repository.create(bookmark);
    return await this.repository.save(newBookmark);
  }

  async getAllByUser(user: UserPayload): Promise<HotelListResult[]> {
    const bookmarks = await this.repository.find({
      where: { userId: user.id },
    });
    const hotelIds = bookmarks.map((bookmark) => bookmark.hotelId);
    const hotels = await this.hotelsService.findByIds(hotelIds);

    const result = hotels.map(async (hotel) => ({
      id: hotel.id,
      name: hotel.name,
      address: hotel.address,
      img: hotel.image,
      tempImages: hotel.hotelImages,
      rooms: hotel.rooms?.length,
      totalPlaces: await this.hotelsService.countTotalPlaces(hotel.id),
      conveniences: hotel.conveniences,
      cheapestPrice: hotel.cheapestPrice,
      availableHotels: hotels.length,
      totalHotels: hotels.length,
    }));

    return Promise.all(result);
  }

  async isBookmarkExist(userId: number, hotelId: number): Promise<Bookmark> {
    return await this.repository.findOne({
      where: { hotelId: hotelId, userId: userId },
    });
  }
}
