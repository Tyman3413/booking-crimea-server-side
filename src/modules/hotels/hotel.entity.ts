import {
  BaseEntity,
  Column,
  Entity,
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

@Entity('hotels')
export class Hotel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: true })
  name: string;

  @Column({ length: 500, nullable: true })
  description: string;

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

  @ManyToOne(() => Term, (term) => term.hotels)
  term: Term;

  @OneToMany(() => Review, (review) => review.hotel)
  reviews: Review[];

  @Column({ type: 'enum', enum: HotelType, nullable: true })
  type: HotelType;

  @Column({ nullable: true })
  cityId: number;

  @ManyToOne(() => City, (city) => city.hotels)
  @JoinTable()
  city: City;

  @OneToMany(() => Room, (room) => room.hotel)
  rooms: Room[];

  @OneToMany(() => Order, (order) => order.hotel)
  orders: Order[];
}
