import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hotel } from '../hotels/hotel.entity';
import { HotelCategory } from './hotel.category.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity('categories')
export class Category extends BaseEntity {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Отель' })
  @Column({ length: 256, nullable: false })
  name: string;

  @ApiProperty({ example: HotelCategory.HOTEL })
  @Column({
    type: 'enum',
    enum: HotelCategory,
    default: HotelCategory.HOTEL,
  })
  type: HotelCategory;

  @OneToMany(() => Hotel, (hotel) => hotel.category)
  hotels: Hotel[];
}
