import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, UntypedFormGroup, Validators} from "@angular/forms";

import {EStorage, PaymentMethodEnum} from "@core/enums";
import {SnackBarService} from "@core/services";
import {Fee, PaymentModel} from "@core/models";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {PaymentService} from "../../../core/services/payment.service";
import {finalize} from "rxjs";

@Component({
  selector: 'vs-dialog-pay-fee',
  templateUrl: './dialog-pay-fee.component.html',
  styleUrls: ['./dialog-pay-fee.component.scss']
})
export class DialogPayFeeComponent implements OnInit {
  paymentMethods: PaymentMethodEnum [] = [
    PaymentMethodEnum.TRANSFER,
    PaymentMethodEnum.CASH,
    PaymentMethodEnum.PLIN,
    PaymentMethodEnum.YAPE,
  ];

  paymentForm = new UntypedFormGroup({
    conceptId: new FormControl(this.data.fee.id, [Validators.required, Validators.min(1)]),
    amount: new FormControl(0, [Validators.required, Validators.min(1)]),
    paymentMethod: new FormControl('', Validators.required)
  });

  file: File | null = null;
  fileName!: string;
  fileSelected: boolean = false;
  showFileMessageError = false;
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogPayFeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fee: Fee },
    private storage: AngularFireStorage,
    private paymentService: PaymentService,
    private snackBar: SnackBarService,
  ) {
  }

  ngOnInit(): void {
  }

  handleSelectFile(event: any): void {
    if(event.target.files.length == 0) {
      return;
    }

    this.file = event.target.files[0];

    if (!this.file) {
      this.fileSelected = false;
      return;
    }

    this.showFileMessageError = false;
    this.fileName = this.file.name;
    this.fileSelected = true;
  }

  handleBtnRegister(): void {
    if (!this.fileSelected) {
      this.showFileMessageError = true;
    }
    this.paymentForm.invalid ? this.paymentForm.markAllAsTouched() : this.createNewPayment();
  }

  createNewPayment(): void {
    this.loading = true;
    this.paymentService.createPaymentFee(this.paymentForm.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe((resp) => this.uploadImage(resp));
  }


  uploadImage(payment: PaymentModel) {
    this.loading = true;
    const filePath = `${EStorage.REF_VOUCHER}/${payment.code}`;
    const task = this.storage.upload(filePath, this.file);
    task.then((snapshot) => {
      this.snackBar.openTopEnd('Voucher registrado.');
      this.dialogRef.close(true);
      this.loading = false;
    });
    task.catch((error) => {
      this.snackBar.openTopEnd(`${error.message}`);
      this.loading = false;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
