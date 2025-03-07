import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatButton } from '@angular/material/button';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dialog',
  templateUrl: './create-order-dialog.component.html',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatButton,
    MatDialogClose,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatDatepicker,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
  ],
})
export class CreateOrderDialogComponent {
  orderForm: FormGroup;
  backendError = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<CreateOrderDialogComponent>
  ) {
    this.orderForm = this.fb.group({
      orderNumber: [
        null,
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      paymentDescription: ['', Validators.required],
      streetAddress: ['', Validators.required],
      town: ['', Validators.required],
      country: ['', Validators.required],
      amountInCents: [null, Validators.required],
      currency: ['', Validators.required],
      paymentDueDate: [null, Validators.required],
    });
  }

  saveOrder() {
    if (this.orderForm.valid) {
      this.http
        .post<object>('/api/orders/create', this.orderForm.value)
        .subscribe({
          next: (response) => {
            console.log('Order created successfully:', response);
            this.backendError = '';
            this.dialogRef.close(true);
          },
          error: (err) => {
            this.backendError =
              err?.error?.message || 'An unexpected error occurred.';
            console.error('Error creating order:', err);
          },
        });
    }
  }
}
