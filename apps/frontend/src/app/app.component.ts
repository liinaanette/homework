import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderListComponent } from '../orders/order-list.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  imports: [
    RouterModule,
    OrderListComponent,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
