import { IsNotEmpty } from 'class-validator';

export class CreateResidenceDto {
  @IsNotEmpty()
  address: string;
}
