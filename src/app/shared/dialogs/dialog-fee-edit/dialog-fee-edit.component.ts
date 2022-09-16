import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentConceptEnum } from '@core/enums';
import { Fee, PaymentModel } from '@core/models';
import { PaymentService } from '@core/services';
import { finalize } from 'rxjs';

@Component({
  selector: 'vs-dialog-fee-edit',
  templateUrl: './dialog-fee-edit.component.html',
  styleUrls: ['./dialog-fee-edit.component.scss']
})
export class DialogFeeEditComponent implements OnInit {
  payments: PaymentModel[] = [];
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<DialogFeeEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Fee,
    private paymentService: PaymentService,
  ) { }

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments(): void {
    this.loading = true;
    this.paymentService.getByConcept(this.data.id, PaymentConceptEnum.FEE)
      .pipe(finalize(() => this.loading = false))
      .subscribe((resp) => this.payments = resp);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
