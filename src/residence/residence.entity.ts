import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ResidenceStatus } from './residence-status.enum';
import { Bill } from 'src/bill/bill.entity';

@Entity()
export class Residence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column()
  status: ResidenceStatus;

  @OneToOne(() => User, { eager: false })
  @JoinColumn()
  user: User;

  @OneToMany((_type) => Bill, (bill) => bill.residence, {
    eager: false,
    onDelete: 'SET NULL',
  })
  bill: Bill[];
}
