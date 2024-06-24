import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WeekService } from './week.service';
import { CreateWeekDto } from './dto/create-week.dto';
import { UpdateWeekDto } from './dto/update-week.dto';

@Controller('week')
export class WeekController {
  constructor(private readonly weekService: WeekService) {}

  @Post()
  create(@Body() createWeekDto: CreateWeekDto) {
    return this.weekService.create(createWeekDto);
  }

  @Get()
  findAll() {
    return this.weekService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weekService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeekDto: UpdateWeekDto) {
    return this.weekService.update(+id, updateWeekDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weekService.remove(+id);
  }
}
