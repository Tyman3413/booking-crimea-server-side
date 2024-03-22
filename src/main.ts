import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  ValidationPipe,
  VERSION_NEUTRAL,
  VersioningType,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    abortOnError: false,
    forceCloseConnections: true,
  });

  const config = app.get(ConfigService);

  const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };

  app.enableShutdownHooks();
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });
  app.enableCors(corsOptions);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false,
    }),
  );

  // OpenAPI Documentation Setup 📖
  const swaggerOptions = new DocumentBuilder()
    .setTitle('API сервиса «Booking Crimea»')
    .setDescription(
      'API документация для сервиса онлайн-бронирования отелей «Booking Crimea»',
    )
    .setVersion('1.0')
    .addTag('Администрирование', 'Операции администрирования')
    .setContact('Виктор', 'https://t.me/Tyman3413', 'tyman3413@gmail.com')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.get<number>('SERVER_PORT'), '0.0.0.0');
}

bootstrap();
