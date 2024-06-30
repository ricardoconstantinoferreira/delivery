import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTimeDto } from './dto/create-time.dto';
import { UpdateTimeDto } from './dto/update-time.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Time } from './entities/time.entity';
import { Repository } from 'typeorm';
import { Currency } from 'src/date/utils/currency';

@Injectable()
export class TimeService {

  constructor(
    @InjectRepository(Time) private timeRepository: Repository<Time>,
  ) {}

  create(createTimeDto: CreateTimeDto): Promise<Time> {
    return this.timeRepository.save(createTimeDto);
  }

  findAll(): Promise<Time[]> {
    return this.timeRepository.find();
  }

  async findTime(store_id: number, week_id: number): Promise<Time[]> {
    let result = [];
    let currency = new Currency();

    let times = await this.timeRepository.createQueryBuilder("time")
      .where("store_id = :store_id", {store_id: store_id})
      .where("week_id = :week_id", {week_id: week_id})
      .execute();

    for (const key in times) {
      let price = times[key]['time_price'];
      result.push(times[key]['time_description'] + " " + currency.formatterPrice(price));
    }

    return result;
  }

  findOne(id: number): Promise<Time> {
    return this.timeRepository.findOneBy({id});
  }

  async update(id: number, updateTimeDto: UpdateTimeDto): Promise<Time | null> {
    try {

      const time = await this.findOne(id);

      if ( time.id == undefined) {
        throw new ForbiddenException();
      }

      await this.timeRepository.update(id, updateTimeDto);
      return time;

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Error updated time',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  async remove(id: number) {
    await this.timeRepository.delete(id);
  }
}
