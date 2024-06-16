import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Hotel } from '../hotels/hotel.entity';

@Entity('bookmarks')
export class Bookmark extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @Column({ name: 'hotel_id', nullable: true })
  hotelId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Hotel)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;
}
