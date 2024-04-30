import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from '../../countries/country.entity';
import { State } from '../../states/state.entity';
import { LandlordType } from '../landlord.type.enum';
import { LandlordStatus } from '../landlord.status.enum';
import { User } from '../../users/user.entity';
import { FileDetails } from '../../filemanager/file.dto';
import { ContactPerson } from './contact.person.entity';
import { LandlordSocialLinks } from './landlord.social.links.entity';
import { City } from '../../cities/city.entity';

@Entity('landlords')
export class Landlord extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'company_name', length: 100, nullable: true })
  companyName: string;

  @Column({ name: 'company_description', nullable: true })
  companyDescription: string;

  @Column({
    name: 'default_language',
    length: 2,
    nullable: true,
    default: 'ru',
  })
  defaultLanguage: string;

  @Column({
    name: 'default_currency',
    length: 3,
    nullable: true,
    default: 'RUB',
  })
  defaultCurrency: string;

  @Column({ type: 'float', nullable: true, default: 0.0 })
  rating: number;

  @Column({ nullable: true })
  countryId: number;

  @ManyToOne(() => Country, (country) => country.landlords)
  @JoinColumn({ name: 'countryId' })
  country: Country;

  @Column({ nullable: true })
  stateId: number;

  @ManyToOne(() => State, (state) => state.landlords)
  @JoinColumn({ name: 'stateId' })
  state: State;

  @Column({ nullable: true })
  cityId: number;

  @ManyToOne(() => City, (city) => city.landlords)
  @JoinColumn({ name: 'cityId' })
  city: City;

  @Column({ length: 500, nullable: true })
  address: string;

  @Column({ length: 10, nullable: true })
  zipcode: string;

  @Column({ type: 'enum', enum: LandlordType, nullable: true })
  type: LandlordType;

  @Column({
    type: 'enum',
    enum: LandlordStatus,
    nullable: true,
    default: LandlordStatus.NEW,
  })
  status: LandlordStatus;

  @Column({ nullable: true })
  userId: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'jsonb', nullable: true })
  logo: FileDetails;

  @Column({ type: 'jsonb', nullable: true })
  documents: FileDetails[];

  @OneToMany(
    () => LandlordSocialLinks,
    (landlordSocialLinks) => landlordSocialLinks.landlord,
  )
  landlordSocialLinks: LandlordSocialLinks[];

  @OneToMany(() => ContactPerson, (contactPerson) => contactPerson.landlord)
  contactPersons: ContactPerson[];
}
