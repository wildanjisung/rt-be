import { Exclude } from 'class-transformer';
import { Bill } from 'src/bill/bill.entity';
import { Residence } from 'src/residence/residence.entity';
import { Task } from 'src/tasks/task.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany((_type) => Task, (task) => task.user, { eager: false })
  tasks: Task[];
}
