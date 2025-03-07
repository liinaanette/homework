import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { pg } from 'pg';
import { TypeOrmModule } from './datasource/typeorm.module';
import { OrdersController } from '../orders/orders.controller';
import { OrdersService } from '../orders/orders.service';

@Module({
  imports: [TypeOrmModule],
  controllers: [AppController, OrdersController],
  providers: [AppService, OrdersService],

})

export class AppModule {}
