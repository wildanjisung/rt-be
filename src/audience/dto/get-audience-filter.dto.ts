import { IsDateString, IsOptional, IsString } from 'class-validator';
import { AudienceStatus } from '../audience-status.enum';

export class GetAudienceFilterDto {
  @IsOptional()
  status?: AudienceStatus;

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
