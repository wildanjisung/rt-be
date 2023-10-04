import { IsDateString, IsOptional, IsString } from 'class-validator';
import { BillStatus } from '../bill-status.enum';

export class GetBillFilterDto {
  @IsOptional()
  status?: BillStatus;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  residenceId?: string;

  @IsOptional()
  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsDateString()
  endDate: Date;
}
