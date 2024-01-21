import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AudienceStatus } from './audience-status.enum';

@Entity()
export class Audience {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  company: string;

  @Column({ nullable: true })
  seat: string;

  @Column({ default: AudienceStatus.INVITED })
  status: AudienceStatus;

  @Column({ nullable: true })
  dateArrive: Date;

  @Column({ nullable: true })
  question: string;

  @Column({ nullable: true })
  transactionJson: string;
}
