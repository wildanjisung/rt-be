import { EntityRepository, Repository } from 'typeorm';
import { Bill } from './bill.entity';
import { GetBillFilterDto } from './dto/get-bill-filter.dto';
import { CreateBillDto } from './dto/create-bill.dto';
import { BillStatus } from './bill-status.enum';
import { Residence } from 'src/residence/residence.entity';

@EntityRepository(Bill)
export class BillRepository extends Repository<Bill> {
  async getBill(filterDto: GetBillFilterDto): Promise<Bill[]> {
    const { status, residenceId, startDate, endDate } = filterDto;

    const query = this.createQueryBuilder('bill');

    if (status) {
      query.andWhere('bill.status = :status', { status });
    }

    if (residenceId) {
      query.andWhere('bill.residence.id = :residenceId', { residenceId });
    }

    if (startDate && endDate) {
      query.andWhere('bill.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    const bill = await query
      .leftJoinAndSelect('bill.residence', 'related')
      .getMany();
    return bill;
  }

  async createBill(
    createBillDto: CreateBillDto,
    residence: Residence,
  ): Promise<Bill> {
    const { date } = createBillDto;

    const bill = this.create({
      date,
      detail: JSON.stringify({ kebersihan: 100, satpam: 15 }),
      status: BillStatus.UNPAID,
      residence,
    });

    await this.save(bill);
    return bill;
  }

  async updateBill(bill: Bill): Promise<Bill> {
    bill.status = BillStatus.PAID;
    bill.transactionJson = JSON.stringify(bill);

    await this.save(bill);
    return bill;
  }
}
