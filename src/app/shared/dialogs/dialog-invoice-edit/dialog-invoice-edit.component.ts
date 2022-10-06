import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, UntypedFormControl, Validators } from '@angular/forms';
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
  totalControl = new UntypedFormControl('', Validators.required);

  constructor(
    public dialogRef: MatDialogRef<DialogInvoiceEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Invoice,
    private paymentService: PaymentService,
    private invoiceService: InvoiceService,
  ) { }

  ngOnInit(): void {
    this.getPayments()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateInvoice(): void {
    this.loading = true;
    this.invoiceService.updateTotal(this.data.id, this.totalControl.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (resp) => this.dialogRef.close(resp),
        error: () => this.totalControl.reset(this.totalPaidOut),
      })
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
