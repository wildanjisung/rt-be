import { IsNotEmpty } from 'class-validator';
import { ResidenceStatus } from '../residence-status.enum';

export class UpdateResidenceDto {
  address: string;

  status: ResidenceStatus;

  userId: string;
}
