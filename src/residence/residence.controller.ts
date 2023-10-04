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
import { ResidenceService } from './residence.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { GetResidenceFilterDto } from './dto/get-residences-filter.dto';
import { Residence } from './residence.entity';
import { CreateResidenceDto } from './dto/create-residence.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateResidenceDto } from './dto/update-residence.dto';

@Controller('residence')
@UseGuards(AuthGuard())
export class ResidenceController {
  constructor(private residenceService: ResidenceService) {}

  @Get()
  getResidence(
    @Query() filterDto: GetResidenceFilterDto,
    @GetUser() user: User,
  ): Promise<Residence[]> {
    return this.residenceService.getResidence(filterDto, user);
  }

  @Get('/:id')
  getResidenceById(@Param('id') id: string): Promise<Residence> {
    return this.residenceService.getResidenceById(id);
  }

  @Post()
  createResidence(
    @Body() createResidenceDto: CreateResidenceDto,
  ): Promise<Residence> {
    return this.residenceService.createResidence(createResidenceDto);
  }

  @Delete('/:id')
  deleteResidence(@Param('id') id: string): Promise<void> {
    return this.residenceService.deleteResidence(id);
  }

  @Put('/:id')
  updateResidence(
    @Param('id') id: string,
    @Body() updateResidenceDto: UpdateResidenceDto,
  ): Promise<Residence> {
    return this.residenceService.updateResidence(id, updateResidenceDto);
  }
}
