import { Module } from '@nestjs/common';
import { StoresModule } from './stores/stores.module';
import { WeekModule } from './week/week.module';
import { TimeModule } from './time/time.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './stores/entities/store.entity';
import { Week } from './week/entities/week.entity';
import { Time } from './time/entities/time.entity';

@Module({
  imports: [
    StoresModule, 
    WeekModule, 
    TimeModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'magento30',
      database: 'delivery',
      entities: [Store, Week, Time],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
})
export class AppModule {}
