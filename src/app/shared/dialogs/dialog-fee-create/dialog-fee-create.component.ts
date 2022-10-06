import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FeeService } from '@core/services';
import { finalize } from 'rxjs';

@Component({
  selector: 'vs-dialog-fee-create',
  templateUrl: './dialog-fee-create.component.html',
  styleUrls: ['./dialog-fee-create.component.scss']
})
export class DialogFeeCreateComponent implements OnInit {
  feeForm = new UntypedFormGroup({
    total: new UntypedFormControl('', [Validators.required, Validators.min(1)]),
    numberFee: new UntypedFormControl(this.data.numberFee, Validators.required),
    paymentDate: new UntypedFormControl('', Validators.required),
    active: new UntypedFormControl(true),
  });

  loading = false;

  constructor(
    public dialogRef: MatDialogRef<DialogFeeCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { numberFee: number, invoiceId: number },
    private feeService: FeeService,
  ) { }

  ngOnInit(): void {
  }

  createFee(): void {
    this.loading = true;
    this.feeService.create(this.data.invoiceId, this.feeForm.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe((resp) => this.dialogRef.close(resp))
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
