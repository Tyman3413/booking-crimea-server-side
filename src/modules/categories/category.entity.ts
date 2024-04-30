import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hotel } from '../hotels/hotel.entity';
import { HotelCategories } from './hotel.categories.enum';

@Entity('categories')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256, nullable: false })
  name: string;

  @Column({
    type: 'enum',
    enum: HotelCategories,
    default: HotelCategories.HOTEL,
  })
  type: HotelCategories;

  @OneToMany(() => Hotel, (hotel) => hotel.category)
  hotels: Hotel[];
}
