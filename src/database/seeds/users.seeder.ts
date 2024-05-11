import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { LandlordSeed, UsersSeed } from '../data/users.seed';
import { User } from '../../modules/users/user.entity';
import { Landlord } from '../../modules/landlords/entities/landlord.entity';

export default class UsersSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const userRepository = dataSource.getRepository(User);
    const landlordRepository = dataSource.getRepository(Landlord);

    for (const user of UsersSeed) {
      let exist = await userRepository.findOneBy({ email: user.email });
      if (!exist) {
        exist = await userRepository.save({
          id: user.id,
          email: user.email,
          password: user.password,
          firstName: user.firstName,
          name: user.nickname,
          role: user.role,
        });
      }
    }

    for (const landlord of LandlordSeed) {
      let exist = await landlordRepository.findOneBy({
        companyName: landlord.companyName,
      });
      if (!exist) {
        exist = await landlordRepository.save({
          id: landlord.id,
          companyName: landlord.companyName,
          type: landlord.type,
          status: landlord.status,
          userId: landlord.userId,
        });
      }
    }
  }
}
