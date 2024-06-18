import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../users/user.entity';
import { Order } from '../orders/order.entity';

@Injectable()
export class EmailsService {
  private clientHost: string = null;
  private adminEmail: string = null;

  constructor(
    private readonly config: ConfigService,
    private readonly mailerService: MailerService,
  ) {
    this.clientHost = this.config.get<string>('CLIENT_HOST');
    this.adminEmail = this.config.get<string>('ADMIN_EMAIL');
  }

  async sendMessageUserRegistered(user: User): Promise<boolean> {
    return await this.mailerService.sendMail({
      to: user.email,
      subject: 'Успешная регистрация',
      template: 'ru/user-registered',
      context: {
        firstName: user.firstName,
        email: user.email,
        loginUrl: `https://t.me/VictorFedin`,
        year: 2024,
      },
    });
  }

  async sendMessageOrderSuccess(order: Order): Promise<boolean> {
    console.log(order.email);
    return await this.mailerService.sendMail({
      to: `${order.email}`,
      subject: 'Номер забронирован',
      template: 'ru/order-confirmed',
      context: {
        fullName:
          `${order.lastName || ''}` +
          ' ' +
          `${order.firstName || ''}` +
          ' ' +
          `${order.patronymic || ''}`,
        room: order.rooms[0].title,
        hotel: order.hotel.name,
        price: order.price,
        checkIn: order.checkIn,
        checkOut: order.checkOut,
        nightsCount: order.nightsCount,
        guests: order.guests,
        phone: order.phone || '-',
        year: 2024,
      },
    });
  }
}
