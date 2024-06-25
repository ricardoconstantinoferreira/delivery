import { Module } from '@nestjs/common';
import { WeekService } from './week.service';
import { WeekController } from './week.controller';
import { Week } from './entities/week.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Week])],
  controllers: [WeekController],
  providers: [WeekService],
})
export class WeekModule {}
