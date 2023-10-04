import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BillService } from './bill.service';
import { GetBillFilterDto } from './dto/get-bill-filter.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Bill } from './bill.entity';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';

@Controller('bill')
@UseGuards(AuthGuard())
export class BillController {
  constructor(private billService: BillService) {}

  @Get()
  get(@Query() filterDto: GetBillFilterDto): Promise<Bill[]> {
    return this.billService.get(filterDto);
  }

  @Get('/:id')
  select(@Param('id') id: string): Promise<Bill> {
    return this.billService.select(id);
  }

  @Post()
  create(@Body() createBillDto: CreateBillDto): Promise<Bill> {
    return this.billService.create(createBillDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<void> {
    return this.billService.delete(id);
  }

  @Put('/:id')
  update(@Param('id') id: string): Promise<Bill> {
    return this.billService.pay(id);
  }
}
