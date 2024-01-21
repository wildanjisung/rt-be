import { IsNotEmpty } from 'class-validator';

export class CreateAudienceDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  company: string;
}
