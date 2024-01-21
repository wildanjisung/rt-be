import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AudienceRepository } from './audience.repository';
import { GetAudienceFilterDto } from './dto/get-audience-filter.dto';
import { Audience } from './audience.entity';
import { CreateAudienceDto } from './dto/create-audience.dto';
// import { UpdateAudienceDto } from './dto/update-audience.dto';
import { ResidenceService } from 'src/residence/residence.service';
import { Residence } from 'src/residence/residence.entity';
import { AudienceStatus } from './audience-status.enum';

@Injectable()
export class AudienceService {
  constructor(
    @InjectRepository(AudienceRepository)
    private audienceRepository: AudienceRepository,
  ) {}

  get(filterDto: GetAudienceFilterDto): Promise<Audience[]> {
    return this.audienceRepository.getAudience(filterDto);
  }

  async create(createAudienceDto: CreateAudienceDto): Promise<Audience> {
    return this.audienceRepository.createAudience(createAudienceDto);
  }

  async select(id: string): Promise<Audience> {
    const found = await this.audienceRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Audience not found with Id ${id} not found`);
    }
    return found;
  }

  // async delete(id: string): Promise<void> {
  //   const result = await this.audienceRepository.delete(id);
  //   if (result.affected === 0) {
  //     throw new NotFoundException(`Bill with ID ${id} not found`);
  //   }
  // }

  // async pay(id: string): Promise<Bill> {
  //   const bill = await this.select(id);
  //   if (bill.status === AudienceStatus.INVITED) {
  //     throw new BadRequestException(`Bill with ID ${id} has been Paid`);
  //   }

  //   return await this.audienceRepository.updateBill(bill);
  // }
}
