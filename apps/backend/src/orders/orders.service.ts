import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Order } from './orders.entity';
import { FilteredOrdersDto, OrderFilterDto } from './orders.dto';

export interface CreateOrder {
  orderNumber: number;
  paymentDescription: string;
  streetAddress: string;
  town: string;
  country: string;
  amountInCents: number;
  currency: string;
  paymentDueDate: Date;
}

@Injectable()
export class OrdersService {
  private orderRepository: Repository<Order>;
  private logger = new Logger();

  constructor(private dataSource: DataSource) {
    this.orderRepository = this.dataSource.getRepository(Order);
  }

  async createOrder(createOrder: CreateOrder): Promise<Order> {
    try {
      const order = this.orderRepository.create(createOrder);
      return await this.orderRepository.save(order);
    } catch (err) {
      if (err.code === '23505') {
        this.logger.error(err.message, err.stack);
        throw new HttpException(
          'Order number already exists',
          HttpStatus.CONFLICT
        );
      }
      this.logger.error(err.message, err.stack);
      throw new InternalServerErrorException(
        'Something went wrong, Try again!'
      );
    }
  }

  async filter(orderFilter: OrderFilterDto): Promise<FilteredOrdersDto> {
    const take = orderFilter.pageSize || 3;
    const skip = orderFilter.page * orderFilter.pageSize || 0;

    const queryBuilder = this.orderRepository.createQueryBuilder('order');

    if (orderFilter.descriptionFilter) {
      queryBuilder.andWhere(
        'order.paymentDescription ILIKE :descriptionFilter',
        {
          descriptionFilter: `%${orderFilter.descriptionFilter}%`,
        }
      );
    }

    if (orderFilter.countryFilter) {
      queryBuilder.andWhere('order.country ILIKE :countryFilter', {
        countryFilter: `${orderFilter.countryFilter}`,
      });
    }

    queryBuilder
      .orderBy(`CASE WHEN order.country = 'Estonia' THEN 1 ELSE 2 END`, 'ASC')
      .addOrderBy('order.paymentDueDate', 'DESC')
      .skip(skip)
      .take(take);

    const [result, total] = await queryBuilder.getManyAndCount();

    return {
      result,
      total,
    };
  }

  async getCountries(): Promise<string[]> {
    return this.orderRepository
      .createQueryBuilder('o')
      .select('DISTINCT o.country')
      .getRawMany();
  }
}
