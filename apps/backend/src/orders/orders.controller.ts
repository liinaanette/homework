import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOrder, OrdersService } from './orders.service';
import { FilteredOrdersDto, OrderFilterDto } from './orders.dto';
import { Order } from './orders.entity';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('/create')
  async create(@Body() order: CreateOrder): Promise<Order> {
    return await this.ordersService.createOrder(order);
  }

  @Post('/filter')
  async filterOrders(
    @Body() orderFilter: OrderFilterDto
  ): Promise<FilteredOrdersDto> {
    return await this.ordersService.filter(orderFilter);
  }

  @Get('/countries')
  async getUsedCountries(): Promise<string[]> {
    return await this.ordersService.getCountries();
  }
}
