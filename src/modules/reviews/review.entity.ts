import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Hotel } from '../hotels/hotel.entity';
import { User } from '../users/user.entity';

@Entity('reviews')
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  comment: string;

  @Column({ type: 'float', default: 0.0, nullable: false })
  rating: number;

  @ManyToOne(() => Hotel, (hotel) => hotel.reviews)
  hotel: Hotel;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt: Date;
}
