import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentStatusEnum } from '@core/enums';
import { Invoice, PaymentModel } from '@core/models';
import { InvoiceService, PaymentService } from '@core/services';
import { finalize } from 'rxjs';

@Component({
  selector: 'vs-dialog-invoice-edit',
  templateUrl: './dialog-invoice-edit.component.html',
  styleUrls: ['./dialog-invoice-edit.component.scss']
})
export class DialogInvoiceEditComponent implements OnInit {
  payments: PaymentModel[] = [];
  loading: boolean = false;

  totalPaidOut: number = 0;
  totalControl = new FormControl('', Validators.required);

  constructor(
    public dialogRef: MatDialogRef<DialogInvoiceEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Invoice,
    private paymentService: PaymentService,
  ) { }

  ngOnInit(): void {
    this.getPayments()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getPayments(): void {
    this.loading = true;
    this.paymentService.getByInvoice(this.data.id)
      .pipe(finalize(() => this.loading = false))
      .subscribe((resp) => this.setPayments(resp));
  }

  setPayments(payments: PaymentModel[]): void {
    this.payments = payments;
    this.payments.forEach((payment) => {
      if(payment.status == PaymentStatusEnum.VERIFIED) {
        this.totalPaidOut += payment.amount;
      }
    });
    this.totalControl.addValidators(Validators.min(this.totalPaidOut));
  }

}
