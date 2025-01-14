import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hotel } from '../hotels/hotel.entity';
import { Convenience } from '../conveniences/convenience.entity';
import { Order } from '../orders/order.entity';
import { RoomImagesEntity } from '../temp/room.images.entity';

@Entity('rooms')
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256, nullable: false })
  title: string;

  @Column({ length: 256, nullable: true })
  subtitle: string;

  @Column()
  description: string;

  @Column()
  beds: number;

  @Column()
  places: number;

  @Column({ name: 'extra_beds', nullable: true })
  extraBeds: number;

  @Column({ name: 'room_size', nullable: true })
  roomSize: number;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  photos: string; // TODO change to image array

  @Column({ name: 'hotel_id', nullable: true })
  hotelId: number;

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @ManyToMany(() => Order, (order) => order.rooms)
  orders: Order[];

  @ManyToMany(() => Convenience, (convenience) => convenience.rooms)
  @JoinTable()
  conveniences: Convenience[];

  // TODO move to S3
  @OneToMany(() => RoomImagesEntity, (roomImages) => roomImages.room)
  roomImages: RoomImagesEntity[];
}
