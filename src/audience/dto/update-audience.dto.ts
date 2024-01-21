import { IsNotEmpty } from 'class-validator';
import { AudienceStatus } from '../audience-status.enum';

export class UpdateBillDto {
  @IsNotEmpty()
  status: AudienceStatus;
}
