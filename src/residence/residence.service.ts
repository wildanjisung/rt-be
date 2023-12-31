import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResidenceRepository } from './residence.repository';
import { GetResidenceFilterDto } from './dto/get-residences-filter.dto';
import { User } from 'src/auth/user.entity';
import { Residence } from './residence.entity';
import { CreateResidenceDto } from './dto/create-residence.dto';
import { UpdateResidenceDto } from './dto/update-residence.dto';
import { UsersRepository } from 'src/auth/users.repository';
import { AuthService } from 'src/auth/auth.service';
import { ResidenceStatus } from './residence-status.enum';

@Injectable()
export class ResidenceService {
  constructor(
    @InjectRepository(ResidenceRepository)
    private residenceRepository: ResidenceRepository,
    private authService: AuthService,
  ) {}

  getResidence(
    filterDto: GetResidenceFilterDto,
    user: User,
  ): Promise<Residence[]> {
    return this.residenceRepository.getResidence(filterDto, user);
  }

  async getResidenceById(id: string): Promise<Residence> {
    const found = await this.residenceRepository.findOne(id, {
      relations: ['user'],
    });

    if (!found) {
      throw new NotFoundException(`Residence with ID "${id}" not found`);
    }

    return found;
  }

  createResidence(createResidenceDto: CreateResidenceDto): Promise<Residence> {
    return this.residenceRepository.createResidence(createResidenceDto);
  }

  async deleteResidence(id: string): Promise<void> {
    const result = await this.residenceRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Residence with ID "${id}" not found`);
    }
  }

  async updateResidence(
    id: string,
    updateResidenceDto: UpdateResidenceDto,
  ): Promise<Residence> {
    const { address, status, userId } = updateResidenceDto;

    // validate residence is exist
    const residence = await this.getResidenceById(id);
    // validate is user has been Occupied
    const occupied = await this.residenceRepository.getResidenceByUser(userId);
    if (occupied) {
      throw new BadRequestException(`User ${userId} has been occupied`);
    }

    residence.address = address ?? residence.address;
    if (userId) {
      const user = await this.authService.getUserById(userId);

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      residence.user = user;
      residence.status = ResidenceStatus.OCCUPIED;
    } else {
      residence.user = null;
      residence.status = ResidenceStatus.UNOCCUPIED;
    }
    await this.residenceRepository.save(residence);

    return residence;
  }
}
