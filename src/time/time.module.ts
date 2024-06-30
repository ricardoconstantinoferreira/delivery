import { Module } from '@nestjs/common';
import { TimeService } from './time.service';
import { TimeController } from './time.controller';
import { Time } from './entities/time.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Time])],
  controllers: [TimeController],
  providers: [TimeService],
})
export class TimeModule {}
