import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ResidenceStatus } from '../residence-status.enum';

export class GetResidenceFilterDto {
  @IsOptional()
  @IsEnum(ResidenceStatus)
  status?: ResidenceStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
