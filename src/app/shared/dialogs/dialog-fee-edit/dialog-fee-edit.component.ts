import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentConceptEnum } from '@core/enums';
import { Fee, Invoice, PaymentModel } from '@core/models';
import { FeeService, PaymentService } from '@core/services';
import { finalize } from 'rxjs';

@Component({
  selector: 'vs-dialog-fee-edit',
  templateUrl: './dialog-fee-edit.component.html',
  styleUrls: ['./dialog-fee-edit.component.scss']
})
export class DialogFeeEditComponent implements OnInit {
  payments: PaymentModel[] = [];
  loading = false;

  feeForm = new UntypedFormGroup({
    paymentDate: new UntypedFormControl('', Validators.required),
    numberFee: new UntypedFormControl('', [Validators.required, Validators.min(1)]),
    total: new UntypedFormControl('', Validators.required),
  });

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
    console.log(this.data.feeId);
    this.paymentService.getTotalPaidOutFee(this.data.feeId)
      .pipe(finalize(() => this.loading = false))
      .subscribe((resp) => {
        console.log(resp);
        if (resp.total) {
          this.totalPaidOut = resp.total;
          this.feeForm.controls['total'].addValidators(Validators.min(this.totalPaidOut))
          this.feeForm.updateValueAndValidity();
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
        this.feeForm.controls['paymentDate'].patchValue(resp.paymentDate);
        this.feeForm.controls['total'].patchValue(resp.total);
        this.feeForm.controls['numberFee'].patchValue(resp.numberFee);
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
    this.feeService.updateTotal(this.data.feeId, this.feeForm.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe((resp) => {
        this.dialogRef.close(resp.invoice);
      })
  }

  handleUpdateFee(): void {
    this.feeForm.invalid ? this.feeForm.markAsTouched() : this.updateTotal();
  }

  getInvoice(): void {
    this.loading = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
