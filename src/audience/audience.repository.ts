import { EntityRepository, Repository } from 'typeorm';
import { Audience } from './audience.entity';
import { GetAudienceFilterDto } from './dto/get-audience-filter.dto';
import { CreateAudienceDto } from './dto/create-audience.dto';
import { AudienceStatus } from './audience-status.enum';
import { Residence } from 'src/residence/residence.entity';

@EntityRepository(Audience)
export class AudienceRepository extends Repository<Audience> {
  async getAudience(filterDto: GetAudienceFilterDto): Promise<Audience[]> {
    const { status, residenceId, startDate, endDate } = filterDto;

    const query = this.createQueryBuilder('audience');

    if (status) {
      query.andWhere('audience.status = :status', { status });
    }

    if (residenceId) {
      query.andWhere('audience.residence.id = :residenceId', { residenceId });
    }

    if (startDate && endDate) {
      query.andWhere('audience.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    const audience = await query.getMany();
    return audience;
  }

  async createAudience(createBillDto: CreateAudienceDto): Promise<Audience> {
    const { name, company } = createBillDto;

    const audience = this.create({
      name,
      company,
    });

    await this.save(audience);
    return audience;
  }

  // async updateBill(bill: Audience): Promise<Audience> {
  //   bill.status = AudienceStatus.INVITED;
  //   bill.transactionJson = JSON.stringify(bill);

  //   await this.save(bill);
  //   return bill;
  // }
}
