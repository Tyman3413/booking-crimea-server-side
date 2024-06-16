import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Hotel } from '../hotels/hotel.entity';
import { OrderStatus } from './order.statuses';
import { Room } from '../rooms/room.entity';

@Entity('orders')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', default: 0.0, nullable: false })
  price: number;

  @Column({ type: 'boolean', default: false, nullable: true })
  prepayment: boolean;

  @Column({ type: 'float', default: 0.0, nullable: true })
  remains: number;

  @Column({ name: 'check_in', type: 'date', nullable: true })
  checkIn: Date;

  @Column({ name: 'check_out', type: 'date', nullable: true })
  checkOut: Date;

  @Column({ name: 'nights_count', nullable: true })
  nightsCount: number;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ name: 'patronymic', nullable: true })
  patronymic: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  guests: number;

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Hotel, (hotel) => hotel.orders)
  hotel: Hotel;

  @ManyToMany(() => Room, (room) => room.orders)
  @JoinTable()
  rooms: Room[];

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.NEW })
  status: OrderStatus;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt: Date;
}
