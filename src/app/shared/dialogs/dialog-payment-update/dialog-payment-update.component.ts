import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PaymentModel} from "@core/models";
import {FormControl, Validators} from "@angular/forms";
import {PaymentService} from "@core/services";

@Component({
  selector: 'vs-dialog-payment-update',
  templateUrl: './dialog-payment-update.component.html',
  styleUrls: ['./dialog-payment-update.component.scss']
})
export class DialogPaymentUpdateComponent implements OnInit {
  amountControl = new FormControl(this.data.payment.amount, [Validators.required, Validators.min(1)]);

  constructor(
    public dialogRef: MatDialogRef<DialogPaymentUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { payment: PaymentModel },
    private paymentService: PaymentService,
  ) {
  }

  ngOnInit(): void {
  }

  handleUpdate(): void {
    this.amountControl.invalid ? this.amountControl.markAsTouched() : this.dialogRef.close(this.amountControl.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
