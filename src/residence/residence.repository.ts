import { EntityRepository, Repository } from 'typeorm';
import { Residence } from './residence.entity';
import { GetResidenceFilterDto } from './dto/get-residences-filter.dto';
import { User } from 'src/auth/user.entity';
import { CreateResidenceDto } from './dto/create-residence.dto';
import { ResidenceStatus } from './residence-status.enum';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Residence)
export class ResidenceRepository extends Repository<Residence> {
  async getResidence(
    filterDto: GetResidenceFilterDto,
    user: User,
  ): Promise<Residence[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('residence');
    // query.where({ user });

    if (status) {
      query.andWhere('residence.status = :status', { status });
    }

    if (search) {
      query.andWhere('(LOWER(residence.address) LIKE LOWER(:search))', {
        search: `%${search}%`,
      });
    }

    const residence = await query
      .leftJoinAndSelect('residence.user', 'related')
      .getMany();
    return residence;
  }

  async createResidence(
    createResidenceDto: CreateResidenceDto,
  ): Promise<Residence> {
    const { address } = createResidenceDto;

    const task = this.create({
      address,
      status: ResidenceStatus.UNOCCUPIED,
    });

    await this.save(task);
    return task;
  }

  async getResidenceByUser(UserId: string): Promise<Residence> {
    try {
      const query = this.createQueryBuilder('residence').leftJoinAndSelect(
        'residence.user',
        'related',
      );
      query.andWhere('residence.user.id = :UserId', { UserId });
      const residence = await query.getOne();
      return residence;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
