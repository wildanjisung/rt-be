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
import { UpdateAudienceDto } from './dto/update-audience.dto';

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
      throw new NotFoundException(
        `Participant not found with Id ${id} not found`,
      );
    }
    return found;
  }

  async delete(id: string): Promise<void> {
    const result = await this.audienceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Bill with ID ${id} not found`);
    }
  }

  // async update(
  //   id: string,
  //   updateAudienceDto: UpdateAudienceDto,
  // ): Promise<Audience> {
  //   const audience = await this.select(id);

  //   return await this.audienceRepository.updateBill(bill);
  // }

  async update(
    id: string,
    updateAudienceDto: UpdateAudienceDto,
  ): Promise<Audience> {
    const {
      name,
      company,
      seat,
      status,
      dateArrive,
      question,
    } = updateAudienceDto;

    const audience = await this.select(id);

    audience.name = name;
    audience.company = company;
    audience.seat = seat;
    // audience.status = status;
    // audience.dateArrive = dateArrive;
    audience.question = question;
    await this.audienceRepository.save(audience);
    const response = await this.select(id);

    return response;
  }
}
