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
import { AudienceService } from './audience.service';
import { GetAudienceFilterDto } from './dto/get-audience-filter.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Audience } from './audience.entity';
import { CreateAudienceDto } from './dto/create-audience.dto';
import { UpdateAudienceDto } from './dto/update-audience.dto';

@Controller('rsvp')
// @UseGuards(AuthGuard())
export class AudienceController {
  constructor(private audienceService: AudienceService) {}

  // show admin, role admin only
  @Get()
  get(@Query() filterDto: GetAudienceFilterDto): Promise<Audience[]> {
    return this.audienceService.get(filterDto);
  }

  // qr scan, show tempat duduk
  @Get('/:id')
  select(@Param('id') id: string): Promise<Audience> {
    return this.audienceService.select(id);
  }

  // rsvp
  @Post()
  create(@Body() createAudienceDto: CreateAudienceDto): Promise<Audience> {
    return this.audienceService.create(createAudienceDto);
  }

  // @Delete('/:id')
  // delete(@Param('id') id: string): Promise<void> {
  //   return this.audienceService.delete(id);
  // }

  @Put('/:id')
  update(
    @Param('id') id: string,
    @Body() updateAudienceDto: UpdateAudienceDto,
  ): Promise<Audience> {
    return this.audienceService.update(id, updateAudienceDto);
  }
}
