import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('passports')
export class PassportEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ nullable: true })
  country: string;

  @Column({ name: 'serial_number', length: 500, nullable: true })
  serialNumber: string;

  @Column({ nullable: true })
  day: number;

  @Column({ nullable: true })
  month: number;

  @Column({ nullable: true })
  year: number;

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @OneToOne(() => User)
  user: User;
}
