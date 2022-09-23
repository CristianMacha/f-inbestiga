import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, UntypedFormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentConceptEnum } from '@core/enums';
import { Fee, Invoice, PaymentModel } from '@core/models';
import { FeeService, InvoiceService, PaymentService } from '@core/services';
import { finalize } from 'rxjs';

@Component({
  selector: 'vs-dialog-fee-edit',
  templateUrl: './dialog-fee-edit.component.html',
  styleUrls: ['./dialog-fee-edit.component.scss']
})
export class DialogFeeEditComponent implements OnInit {
  payments: PaymentModel[] = [];
  loading = false;

  amountControl = new UntypedFormControl(0, Validators.required);
  fee: Fee = new Fee();
  invoice: Invoice = new Invoice();
  totalPaidOut = 0;

  constructor(
    public dialogRef: MatDialogRef<DialogFeeEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { feeId: number },
    private paymentService: PaymentService,
    private feeService: FeeService,
  ) { }

  ngOnInit(): void {
    this.getFee();
    this.getPayments();
    this.getTotalPaidOut();
  }

  getTotalPaidOut(): void {
    this.loading = true;
    this.paymentService.getTotalPaidOutFee(this.data.feeId)
      .pipe(finalize(() => this.loading = false))
      .subscribe((resp) => {
        if (resp.total) {
          this.totalPaidOut = resp.total;
          this.amountControl.addValidators(Validators.min(this.totalPaidOut));
          this.amountControl.updateValueAndValidity();
        }
      });
  }

  getFee(): void {
    this.loading = true;
    this.feeService.getOne(this.data.feeId)
      .pipe(finalize(() => this.loading = false))
      .subscribe((resp) => {
        this.fee = resp;
        this.invoice = resp.invoice;
        this.amountControl.patchValue(this.fee.total);
      })
  }

  getPayments(): void {
    this.loading = true;
    this.paymentService.getByConcept(this.data.feeId, PaymentConceptEnum.FEE)
      .pipe(finalize(() => this.loading = false))
      .subscribe((resp) => this.payments = resp);
  }

  updateTotal(): void {
    this.loading = true;
    this.feeService.updateTotal(this.data.feeId, this.amountControl.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe((resp) => {
        this.dialogRef.close(resp.invoice);
      })
  }

  handleUpdateFee(): void {
    this.amountControl.invalid ? this.amountControl.markAsTouched() : this.updateTotal();
  }

  getInvoice(): void {
    this.loading = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
