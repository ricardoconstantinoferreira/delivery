import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { WeekService } from './week.service';
import { CreateWeekDto } from './dto/create-week.dto';
import { UpdateWeekDto } from './dto/update-week.dto';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';

@Controller('week')
export class WeekController {
  constructor(private readonly weekService: WeekService) {}

  @Post()
  @UseFilters(new HttpExceptionFilter)
  create(@Body() createWeekDto: CreateWeekDto) {
    return this.weekService.create(createWeekDto);
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number) {
    return this.weekService.findOne(id);
  }

  @Get("/store/:store_id")
  findOneStore(@Param('store_id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) store_id: number) {
    return this.weekService.findOneStore(store_id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number, 
    @Body() updateWeekDto: UpdateWeekDto
  ) {
    return this.weekService.update(id, updateWeekDto);
  }

  @Delete(':id')
  remove(
    @Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) 
    id: number
  ) {
    return this.weekService.remove(id);
  }
}
