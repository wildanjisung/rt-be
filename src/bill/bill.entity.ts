import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BillStatus } from './bill-status.enum';
import { User } from 'src/auth/user.entity';
import { Residence } from 'src/residence/residence.entity';

@Entity()
export class Bill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  status: BillStatus;

  @Column()
  detail: string;

  @Column({ nullable: true })
  transactionJson: string;

  @ManyToOne((_type) => Residence, (residence) => residence.bill, {
    eager: false,
    onDelete: 'SET NULL',
  })
  residence: Residence;
}
