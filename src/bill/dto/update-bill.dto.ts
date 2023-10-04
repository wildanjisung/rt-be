import { IsNotEmpty } from 'class-validator';
import { BillStatus } from '../bill-status.enum';

export class UpdateBillDto {
  @IsNotEmpty()
  status: BillStatus;
}
