import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CreateOrderDialogComponent } from './create-order-dialog.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { Country, FilteredResponse, Order, OrderFilter } from './order.model';
import { DatePipe, NgForOf } from '@angular/common';
import {
  MatOption,
  MatSelect,
  MatSelectChange,
} from '@angular/material/select';

// Define your interfaces here

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatFormField,
    MatInput,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    MatButton,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatLabel,
    DatePipe,
    MatSelect,
    MatOption,
    NgForOf,
  ],
})
export class OrderListComponent implements OnInit {
  displayedColumns: string[] = [
    'orderNumber',
    'paymentDescription',
    'country',
    'paymentDueDate',
  ];
  responses: Order[] = [];
  countries: Country[] = [];

  pageSize = 10;
  pageIndex = 0;
  descriptionFilter = '';
  countryFilter = '';
  length = 0;
  pageSizeOptions = [5, 10, 25];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent: PageEvent | undefined;

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  get orderFilter(): OrderFilter {
    return {
      page: this.pageIndex,
      pageSize: this.pageSize,
      descriptionFilter: this.descriptionFilter,
      countryFilter: this.countryFilter,
    };
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.fetchFilteredOrders();
  }

  ngOnInit() {
    this.fetchFilteredOrders();
    this.fetchCountries();
  }

  fetchFilteredOrders() {
    this.http
      .post<FilteredResponse>('/api/orders/filter', this.orderFilter)
      .subscribe({
        next: (response) => {
          this.responses = response.result;
          this.length = response.total;
        },
        error: (err) => {
          console.error('Error creating order:', err);
        },
      });
  }

  fetchCountries() {
    this.http.get<Country[]>('/api/orders/countries').subscribe({
      next: (response) => {
        this.countries = response;
      },
      error: (err) => {
        console.error('Error querying countries:', err);
      },
    });
  }

  applySearchFilter(event: Event) {
    this.descriptionFilter = (event.target as HTMLInputElement).value;
    this.pageIndex = 0;
    this.fetchFilteredOrders();
  }

  applyCountryFilter(event: MatSelectChange) {
    this.countryFilter = event.value ? event.value.country : '';
    this.pageIndex = 0;
    this.fetchFilteredOrders();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateOrderDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchFilteredOrders();
        this.fetchCountries();
      }
    });
  }
}
