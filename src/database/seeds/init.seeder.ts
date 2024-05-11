import { runSeeders, Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import UsersSeeder from './users.seeder';

export default class InitSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [UsersSeeder],
    });
  }
}
