import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hotel } from '../hotels/hotel.entity';
import { Room } from '../rooms/room.entity';

@Entity('conveniences')
export class Convenience extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64, nullable: false })
  name: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  userId: number;

  @ManyToMany(() => Hotel, (hotel) => hotel.conveniences)
  hotels: Hotel[];

  @ManyToMany(() => Room, (room) => room.conveniences)
  rooms: Room[];
}
