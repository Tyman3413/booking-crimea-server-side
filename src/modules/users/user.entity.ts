import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Country } from '../countries/country.entity';
import { State } from '../states/state.entity';
import { Landlord } from '../landlords/entities/landlord.entity';
import { Review } from '../reviews/review.entity';
import { Order } from '../orders/order.entity';
import { City } from '../cities/city.entity';
import { UserGender } from './enums/user.gender.enum';
import { UserRole } from './enums/user.role.enum';
import { FileDetailsDto } from '../filemanager/dto/file.dto';
import { PassportEntity } from './passport.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256, unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ name: 'first_name', length: 50, nullable: false })
  firstName: string;

  @Column({ name: 'last_name', length: 50, nullable: true })
  lastName: string;

  @Column({ length: 50, unique: true, nullable: true })
  nickname: string;

  @Column({ type: 'date', nullable: true })
  birthday: Date;

  @Column({ type: 'enum', enum: UserGender, nullable: true })
  gender: UserGender;

  @Column({ length: 100, unique: true, nullable: true })
  phone: string;

  @Column({ nullable: true })
  countryId: number;

  @ManyToOne(() => Country, (country) => country.users)
  @JoinColumn({ name: 'countryId' })
  country: Country;

  @Column({ nullable: true })
  stateId: number;

  @ManyToOne(() => State, (state) => state.users)
  @JoinColumn({ name: 'stateId' })
  state: State;

  @Column({ nullable: true })
  cityId: number;

  @ManyToOne(() => City, (city) => city.users)
  @JoinColumn({ name: 'cityId' })
  city: City;

  @Column({ length: 500, nullable: true })
  address: string;

  @Column({ length: 10, nullable: true })
  zipcode: string;

  @Column({ length: 100, nullable: true, default: 'Europe/Moscow' })
  timezone: string;

  @Column({ type: 'jsonb', nullable: true })
  avatar: FileDetailsDto;

  @Column({ length: 10, nullable: true, default: 'ru-RU' })
  locale: string;

  @Column({ length: 3, nullable: true, default: 'RUB' })
  preferredCurrency: string;

  @Column({ length: 2, nullable: true, default: 'ru' })
  preferredLanguage: string;

  @Column({ nullable: true })
  landlordId: number;

  @OneToOne(() => Landlord)
  @JoinColumn({ name: 'landlordId' })
  landlord: Landlord;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @Column({
    type: 'enum',
    enum: UserRole,
    nullable: true,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ name: 'passport_id', nullable: true })
  passportId: number;

  @OneToOne(() => PassportEntity)
  passport: PassportEntity;

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'last_login' })
  lastLogin: Date;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'date_joined' })
  dateJoined: Date;

  @Column({ nullable: true, default: false })
  deleted: boolean;

  @Column({ nullable: true, default: false })
  disabled: boolean;

  public getFullName(): string {
    return `${this.firstName || ''} ${this.lastName || ''}`;
  }
}
