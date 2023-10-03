import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ResidenceStatus } from './residence-status.enum';

@Entity()
export class Residence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column()
  status: ResidenceStatus;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;
}
