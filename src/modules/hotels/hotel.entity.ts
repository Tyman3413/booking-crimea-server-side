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
import { HotelType } from './hotel.type.enum';
import { Room } from '../rooms/room.entity';
import { Convenience } from '../conveniences/convenience.entity';
import { Category } from '../categories/category.entity';
import { Term } from '../terms/term.entity';
import { Review } from '../reviews/review.entity';
import { Order } from '../orders/order.entity';
import { City } from '../cities/city.entity';
import { Landlord } from '../landlords/entities/landlord.entity';
import { HotelImagesEntity } from '../temp/hotel.images.entity';

@Entity('hotels')
export class Hotel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: true })
  name: string;

  @Column({ length: 500, nullable: true })
  description: string;

  @Column({ length: 200, nullable: true })
  image: string;

  @Column({ nullable: true })
  address: string;

  @ManyToOne(() => Category, (category) => category.hotels)
  category: Category;

  @Column({
    type: 'float',
    name: 'cheapest_price',
    nullable: true,
    default: 0.0,
  })
  cheapestPrice: number;

  @ManyToMany(() => Convenience, (convenience) => convenience.hotels)
  @JoinTable()
  conveniences: Convenience[];

  @Column({ name: 'term_id', nullable: true })
  termId: number;

  @ManyToOne(() => Term, (term) => term.hotels)
  @JoinColumn({ name: 'term_id' })
  term: Term;

  @Column({ type: 'float', nullable: true, default: 0.0 })
  rating: number;

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longitude: string;

  @OneToMany(() => Review, (review) => review.hotel)
  reviews: Review[];

  @Column({ type: 'enum', enum: HotelType, nullable: true })
  type: HotelType;

  @Column({ nullable: true })
  cityId: number;

  @ManyToOne(() => City, (city) => city.hotels)
  @JoinTable()
  city: City;

  @Column({ name: 'landlord_id', nullable: true })
  landlordId: number;

  @ManyToOne(() => Landlord, (landlord) => landlord.hotels)
  @JoinColumn({ name: 'landlord_id' })
  landlord: Landlord;

  @OneToMany(() => Room, (room) => room.hotel)
  rooms: Room[];

  @OneToMany(() => Order, (order) => order.hotel)
  orders: Order[];

  // TODO move to S3
  @OneToMany(() => HotelImagesEntity, (hotelImages) => hotelImages.hotelId)
  hotelImages: HotelImagesEntity[];
}
