import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { State } from '../states/state.entity';
import { Landlord } from '../landlords/entities/landlord.entity';

@Entity('countries')
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120, nullable: true })
  name: string;

  @Column({ length: 120, nullable: true })
  englishName: string;

  @Column({ name: 'phone_code', length: 50, nullable: true })
  phoneCode: string;

  @Column({ length: 2, nullable: true })
  iso2: string;

  @OneToMany(() => State, (state) => state.country)
  states: State[];

  @OneToMany(() => User, (user) => user.country)
  users: User[];

  @OneToMany(() => Landlord, (landlord) => landlord.country)
  landlords: Landlord[];
}
