import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  @UseFilters(new HttpExceptionFilter)
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }

  @Get()
  findAll() {
    return this.storesService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) 
    id: number
  ) {
    return this.storesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number, 
    @Body() updateStoreDto: UpdateStoreDto
  ) {
    return this.storesService.update(id, updateStoreDto);
  }

  @Delete(':id')
  remove(
    @Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) 
    id: number
  ) {
    return this.storesService.remove(id);
  }
}
