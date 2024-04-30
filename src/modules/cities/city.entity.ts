import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Landlord } from '../landlords/entities/landlord.entity';
import { Hotel } from '../hotels/hotel.entity';
import { State } from '../states/state.entity';

@Entity('cities')
export class City extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: true })
  name: string;

  @Column({ length: 100, nullable: true })
  englishName: string;

  @Column({ nullable: true })
  population: number;

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: true })
  stateId: number;

  @ManyToOne(() => State, (state) => state.cities)
  @JoinColumn({ name: 'stateId' })
  state: State;

  @OneToMany(() => User, (user) => user.city)
  users: User[];

  @OneToMany(() => Landlord, (landlord) => landlord.city)
  landlords: Landlord[];

  @OneToMany(() => Hotel, (hotel) => hotel.city)
  hotels: Hotel[];
}
