import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BillRepository } from './bill.repository';
import { GetBillFilterDto } from './dto/get-bill-filter.dto';
import { Bill } from './bill.entity';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { ResidenceService } from 'src/residence/residence.service';
import { Residence } from 'src/residence/residence.entity';
import { BillStatus } from './bill-status.enum';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(BillRepository)
    private billRepository: BillRepository,
    private residenceService: ResidenceService,
  ) {}

  get(filterDto: GetBillFilterDto): Promise<Bill[]> {
    return this.billRepository.getBill(filterDto);
  }

  async create(createBillDto: CreateBillDto): Promise<Bill> {
    const { date, residenceId } = createBillDto;
    let residence: Residence;
    if (residenceId) {
      residence = await this.residenceService.getResidenceById(residenceId);

      if (!residence) {
        throw new NotFoundException(
          `Residence with ID ${residenceId} not found`,
        );
      }
    }

    return this.billRepository.createBill(createBillDto, residence);
  }

  async select(id: string): Promise<Bill> {
    const found = await this.billRepository.findOne(id, {
      relations: ['residence'],
    });
    if (!found) {
      throw new NotFoundException(`Bill with Id ${id} not found`);
    }
    return found;
  }

  async delete(id: string): Promise<void> {
    const result = await this.billRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Bill with ID ${id} not found`);
    }
  }

  async pay(id: string): Promise<Bill> {
    const bill = await this.select(id);
    if (bill.status === BillStatus.PAID) {
      throw new BadRequestException(`Bill with ID ${id} has been Paid`);
    }

    return await this.billRepository.updateBill(bill);
  }
}
