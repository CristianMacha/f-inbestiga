import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {EFeePaymentMethod, EStorage} from "@core/enums";
import {FeeService} from "@core/services";
import {Fee} from "@core/models";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'vs-dialog-pay-fee',
  templateUrl: './dialog-pay-fee.component.html',
  styleUrls: ['./dialog-pay-fee.component.scss']
})
export class DialogPayFeeComponent implements OnInit {
  paymentMethods: EFeePaymentMethod[] = [
    EFeePaymentMethod.BBVA,
    EFeePaymentMethod.CASH_PAYMENT,
    EFeePaymentMethod.BCP,
    EFeePaymentMethod.INTERBANK,
    EFeePaymentMethod.PLIN,
    EFeePaymentMethod.YAPE,
  ]

  feeForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    fileName: new FormControl('', Validators.required),
    paymentMethod: new FormControl('', Validators.required),
  });

  file: File | null = null;
  fileSelected: boolean = false;
  feeCode: string = '';
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogPayFeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fee: Fee },
    private feeService: FeeService,
    private storage: AngularFireStorage,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.feeForm.patchValue(this.data.fee);
  }

  handleSelectFile(event: any): void {
    this.file = event.target.files[0];

    if (!this.file) {
      return;
    }

    this.fileSelected = true;
    this.feeForm.controls['fileName'].patchValue(this.file.name);
  }

  handleRegister() {
    if (this.feeForm.invalid && this.file == null) {
      this.feeForm.markAllAsTouched();
    } else {
      this.updateFee(this.feeForm.value);
    }
  }

  updateFee(fee: Fee): void {
    this.loading = true;
    this.feeService.update(fee)
      .subscribe((resp) => {
        this.feeCode = resp.code;
        this.uploadImage();
      })
  }

  uploadImage() {
    this.loading = true;
    const filePath = `${EStorage.REF_VOUCHER}/${this.feeCode}`;
    const task = this.storage.upload(filePath, this.file);
    task.then((snapshot) => {
      this.snackBar.open('Voucher registrado.');
      this.onNoClick();
    });
    task.catch((error) => this.snackBar.open(`${error.message}`));
  }

  onNoClick(): void {
    this.dialogRef.close(true);
  }

}
