import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import * as path from 'node:path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { EmailsService } from './emails.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          auth: {
            user: configService.get<string>('SMTP_USER'),
            pass: configService.get<string>('SMTP_PASS'),
          },
        },
        defaults: {
          from: '"BookingLounge" <booking-crimea@gmail.com>',
        },
        template: {
          dir: path.join(__dirname, '../../resources/templates/emails'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
        options: {
          partials: {
            dir: path.join(__dirname, '../../resources/templates/partials'),
            options: {
              strict: true,
            },
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}
