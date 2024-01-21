import { Module } from '@nestjs/common';
import { AudienceController } from './audience.controller';
import { AudienceService } from './audience.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudienceRepository } from './audience.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([AudienceRepository]), AuthModule],
  controllers: [AudienceController],
  providers: [AudienceService],
})
export class AudienceModule {}
