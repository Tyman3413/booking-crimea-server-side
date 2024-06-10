import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hotel } from '../hotels/hotel.entity';
import { Convenience } from '../conveniences/convenience.entity';
import { Order } from '../orders/order.entity';
import { FileDetailsDto } from '../filemanager/dto/file.dto';
import { FileEntity } from '../filemanager/file.entity.';

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

  @Column({ type: 'jsonb', nullable: true })
  photos: FileDetailsDto;

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

  @ManyToMany(() => FileEntity)
  @JoinTable({ name: 'rooms_images' })
  images: FileEntity[];
}
