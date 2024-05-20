import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hotel } from '../hotels/hotel.entity';

// TODO DELETE when move to S3
@Entity('hotel_images')
export class HotelImagesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  hotelId: number;

  @ManyToOne(() => Hotel, (hotel) => hotel.hotelImages)
  @JoinColumn({ name: 'hotelId' })
  hotel: Hotel;
}
