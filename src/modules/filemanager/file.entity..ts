import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Length } from 'class-validator';
import { User } from '../users/user.entity';
import { FileDetailsDto, IFileDetailsS3 } from './dto/file.dto';

@Entity('files')
export class FileEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Length(2, 150)
  @Column({ length: 150 })
  slug: string;

  @Column({ default: false })
  isPrivate: boolean;

  @Index()
  @ManyToOne(() => User)
  user: User;

  @Column('jsonb', { nullable: true })
  fileDTO: FileDetailsDto;

  @Column('jsonb', { nullable: true })
  fileS3DTO: IFileDetailsS3;

  @CreateDateColumn({ type: 'time with time zone', name: 'created_at' })
  createdAt: Date;

  static async init(
    user: User,
    slug: string,
    fileDTO: FileDetailsDto,
    fileS3DTO: IFileDetailsS3,
    isPrivate: boolean = false,
  ): Promise<FileEntity> {
    const file = new FileEntity();
    file.user = user;
    file.slug = slug;
    file.fileDTO = fileDTO;
    file.fileS3DTO = fileS3DTO;
    file.isPrivate = isPrivate;
    return await file.save();
  }
}
