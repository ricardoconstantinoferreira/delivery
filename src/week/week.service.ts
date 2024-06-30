import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWeekDto } from './dto/create-week.dto';
import { UpdateWeekDto } from './dto/update-week.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Week } from './entities/week.entity';
import { Repository } from 'typeorm';
import { DateTime } from 'src/date/utils/date.time';

@Injectable()
export class WeekService {

  constructor(
    @InjectRepository(Week) private weekRepository: Repository<Week>,
  ) {}

  async create(createWeekDto: CreateWeekDto): Promise<Week[]> {

    try {
      const {days, store_id} = createWeekDto;
      let arrayDays = days.split(",");
      let weekEntities = [];

      for (let i = 0; i < arrayDays.length; i++) {
        const weekEntity = new Week();
        weekEntity.days = arrayDays[i].trim();
        weekEntity.store_id = store_id;
        await this.weekRepository.save(weekEntity);
        weekEntities.push(weekEntity);
      }

      return weekEntities;

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Error updated store',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  findOne(id: number): Promise<Week> {
    return this.weekRepository.findOneBy({id});
  }

  async findOneStore(store_id: number): Promise<object> {
    let dateTime = new DateTime();
    let days = await this.weekRepository.createQueryBuilder("week")
      .where("store_id = :store_id", {store_id: store_id})
      .execute();

    return await dateTime.getTodayDate(days);
  }

  async update(id: number, updateWeekDto: UpdateWeekDto) {
    try {

      const store = await this.findOne(id);

      if ( store.id == undefined) {
        throw new ForbiddenException();
      }

      await this.weekRepository.update(id, updateWeekDto);
      return store;

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Error updated store',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  async remove(id: number) {
    await this.weekRepository.delete(id);
  }
}
