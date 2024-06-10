import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Length } from 'class-validator';
import { FileDetailsDto } from '../filemanager/dto/file.dto';
import { User } from '../users/user.entity';
import { Landlord } from '../landlords/entities/landlord.entity';
import { Hotel } from '../hotels/hotel.entity';
import { Room } from '../rooms/room.entity';
import { Order } from '../orders/order.entity';

@Entity('complaints')
export class Complaint extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Length(0, 1000)
  @Column({ length: 1000 })
  description: string;

  @Column('jsonb', { nullable: true })
  complaintFile: FileDetailsDto;

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @Index()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'landlord_id', nullable: true })
  landlordId: number;

  @Index()
  @ManyToOne(() => Landlord)
  @JoinColumn({ name: 'landlord_id' })
  toLandlord: Landlord;

  @Column({ name: 'hotel_id', nullable: true })
  hotelId: number;

  @ManyToOne(() => Hotel)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @Column({ name: 'room_id', nullable: true })
  roomId: number;

  @ManyToOne(() => Room)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @Column({ name: 'order_id', nullable: true })
  orderId: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: Date;
}
