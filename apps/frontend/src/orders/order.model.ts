export interface OrderFilter {
  descriptionFilter: string;
  countryFilter: string;
  page: number;
  pageSize: number;
}

export interface Country {
  country: string;
}

export interface FilteredResponse {
  result: Order[];
  total: number;
}

export interface Order {
  orderNumber: number;
  paymentDescription: string;
  streetAddress: string;
  town: string;
  country: string;
  amountInCents: number;
  currency: string;
  paymentDueDate: Date;
}
