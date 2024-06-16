import { Controller, Param, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { BookmarksService } from './bookmarks.service';
import { Bookmark } from './bookmark.entity';
import { CurrentUser } from '../users/decorators/user.decorator';
import { UserPayload } from '../auth/dto/user.payload';
import { AuthGuard } from '@nestjs/passport';
import { HotelListResult } from '../hotels/hotel.list.result';

@Controller('bookmarks')
@ApiTags('Закладки 🔖')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @ApiOperation({ summary: 'Добавление отеля в избранное' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'hotelId', required: true, type: Number })
  @Post('add/:hotelId')
  async addBookmark(
    @CurrentUser() user: UserPayload,
    @Param('hotelId') hotelId: number,
  ): Promise<Bookmark> {
    console.log(user);
    return await this.bookmarksService.create(user, hotelId);
  }

  @ApiOperation({ summary: 'Добавление отеля в избранное' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('my')
  async getBookmarks(
    @CurrentUser() user: UserPayload,
  ): Promise<HotelListResult[]> {
    return await this.bookmarksService.getAllByUser(user);
  }
}
