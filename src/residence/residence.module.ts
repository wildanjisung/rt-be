import { Module } from '@nestjs/common';
import { ResidenceController } from './residence.controller';
import { ResidenceService } from './residence.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ResidenceRepository } from './residence.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ResidenceRepository]), AuthModule],
  controllers: [ResidenceController],
  providers: [ResidenceService],
  exports: [ResidenceService],
})
export class ResidenceModule {}
