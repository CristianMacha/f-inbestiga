import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import {FormControl} from "@angular/forms";

import {IDialogVerifyPayment} from "@core/interfaces";
import {Fee} from "@core/models";
import {EFeeStatus} from "@core/enums";

@Component({
  selector: 'vs-dialog-verify-payment',
  templateUrl: './dialog-verify-payment.component.html',
  styleUrls: ['./dialog-verify-payment.component.scss']
})
export class DialogVerifyPaymentComponent implements OnInit {
  subscription: Subscription = new Subscription();

  fee: Fee = new Fee();
  observationControl: FormControl = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<DialogVerifyPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogVerifyPayment,
  ) {
    this.fee.status = data.accepted ? EFeeStatus.PAID_OUT : EFeeStatus.REFUSED;
    this.subscription.add(
      this.observationControl.valueChanges.subscribe((value) => this.fee.observation = value)
    )
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
