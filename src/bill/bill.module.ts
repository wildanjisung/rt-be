import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillRepository } from './bill.repository';
import { AuthModule } from 'src/auth/auth.module';
import { ResidenceModule } from 'src/residence/residence.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BillRepository]),
    AuthModule,
    ResidenceModule,
  ],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule {}
