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
import { Registration } from '../registrations/registration.entity';
import { Habitation } from '../habitations/habitation.entity';
import { Hotel } from '../hotels/hotel.entity';

@Entity('terms')
export class Term extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'registration_id', nullable: true })
  registrationId: number;

  @ManyToOne(() => Registration, (registration) => registration.terms)
  @JoinColumn({ name: 'registration_id' })
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
