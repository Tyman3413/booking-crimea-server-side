import { ConfigModule } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import InitSeeder from '../seeds/init.seeder';

ConfigModule.forRoot({
  envFilePath: '.env',
});

const options = {
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: true,
  synchronize: false,
  entities: [__dirname + '/../../modules/**/*.entity.ts'],
  migrations: [__dirname + '/../../modules/database/migrations/**/*.ts'],
  seeds: [InitSeeder],
};

export const source = new DataSource(
  options as DataSourceOptions & SeederOptions,
);
