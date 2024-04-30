import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hotel } from '../hotels/hotel.entity';

@Entity('conveniences')
export class Convenience extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64, nullable: false })
  name: string;

  @Column({ nullable: true })
  icon: string; // TODO change to image

  @ManyToMany(() => Hotel)
  hotels: Hotel[];
}
