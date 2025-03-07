import { Order } from './orders.entity';

export class OrderFilterDto {
  countryFilter: string;
  descriptionFilter: string;
  page: number;
  pageSize: number;
}

export class FilteredOrdersDto {
  result: Order[]
  total: number
}
