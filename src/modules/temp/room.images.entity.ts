import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from '../rooms/room.entity';

// TODO DELETE when move to S3
@Entity('room_images')
export class RoomImagesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  roomId: number;
}
