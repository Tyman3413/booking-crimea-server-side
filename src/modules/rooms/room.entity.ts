import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hotel } from '../hotels/hotel.entity';

@Entity('rooms')
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256, nullable: false })
  name: string;

  @Column()
  description: string;

  @Column()
  beds: number;

  @Column()
  places: number;

  @Column()
  extraBeds: number;

  @Column()
  roomSize: number;

  @Column()
  price: number;

  @Column()
  photos: string; // TODO change to image array

  // TODO add conveniences

  @Column({ nullable: true })
  hotelId: number;

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
  @JoinColumn({ name: 'hotelId' })
  hotel: Hotel;
}
