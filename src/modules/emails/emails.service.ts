import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../users/user.entity';

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
}
