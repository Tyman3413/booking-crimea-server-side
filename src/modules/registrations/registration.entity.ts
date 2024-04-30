import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Term } from '../terms/term.entity';

@Entity('registrations')
export class Registration extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'time', precision: 0, name: 'arrival_time' })
  arrivalTime: string;

  @Column({ type: 'time', precision: 0, name: 'departure_time' })
  departureTime: string;

  @OneToMany(() => Term, (term) => term.registration)
  terms: Term[];
}
