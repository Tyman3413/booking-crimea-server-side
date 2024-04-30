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
import { Registration } from '../registrations/registration.entity';
import { Habitation } from '../habitations/habitation.entity';
import { Hotel } from '../hotels/hotel.entity';

@Entity('terms')
export class Term extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Registration, (registration) => registration.terms)
  registration: Registration;

  @ManyToMany(() => Habitation, (habitation) => habitation.terms)
  @JoinTable()
  habitations: Habitation[];

  @Column({ name: 'prepayment_percentage', nullable: true })
  prepaymentPercentage: number;

  @Column({ name: 'reservation_cancel', nullable: true })
  reservationCancel: string;

  @OneToMany(() => Hotel, (hotel) => hotel.term)
  hotels: Hotel[];
}
