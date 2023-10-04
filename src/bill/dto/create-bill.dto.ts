import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateBillDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  residenceId: string;
}
