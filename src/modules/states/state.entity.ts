import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from '../countries/country.entity';
import { City } from '../cities/city.entity';
import { User } from '../users/user.entity';
import { Landlord } from '../landlords/entities/landlord.entity';

@Entity('states')
export class State extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: true })
  name: string;

  @Column({ length: 100, nullable: true })
  englishName: string;

  @Column({ nullable: true })
  countryId: number;

  @ManyToOne(() => Country, (country) => country.states)
  @JoinColumn({ name: 'countryId' })
  country: Country;

  @OneToMany(() => City, (city) => city.state)
  cities: City[];

  @OneToMany(() => User, (user) => user.state)
  users: User[];

  @OneToMany(() => Landlord, (landlord) => landlord.state)
  landlords: Landlord[];
}
