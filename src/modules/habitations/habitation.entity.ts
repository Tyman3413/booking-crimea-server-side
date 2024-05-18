import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Term } from '../terms/term.entity';

@Entity('habitations')
export class Habitation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256, nullable: true })
  rule: string;

  @Column({ nullable: true })
  icon: string;

  @ManyToMany(() => Term, (term) => term.habitations)
  terms: Term[];
}
