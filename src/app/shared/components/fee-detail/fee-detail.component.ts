import { Component, Input, OnInit } from '@angular/core';
import { Fee, PaymentModel } from '@core/models';
import { CFeeStatus, PaymentConceptEnum } from '@core/enums';
import { MatDialog } from '@angular/material/dialog';
import { DialogPayFeeComponent } from '../../dialogs/dialog-pay-fee/dialog-pay-fee.component';
import { FeeService, PaymentService } from '@core/services';
import { DialogFeeEditComponent } from '../../dialogs/dialog-fee-edit/dialog-fee-edit.component';

@Component({
  selector: 'vs-fee-detail',
  templateUrl: './fee-detail.component.html',
  styleUrls: ['./fee-detail.component.scss'],
})
export class FeeDetailComponent implements OnInit {
  @Input() fee!: Fee;
  title: string = 'PENDIENTE';
  cFeeStatus = CFeeStatus;
  payments: PaymentModel[] = [];
  paymentStatus: any;
  constructor(
    private dialog: MatDialog,
    private paymentService: PaymentService,
    private feeService: FeeService
  ) {}

  ngOnInit(): void {
    this.getPayments();
  }

  handleBtnEditFee():void {
    const dialogRef = this.dialog.open(DialogFeeEditComponent, {
      width: '500px',
      data: this.fee,
      autoFocus: false,
      disableClose: true,
    });
  }

  handleRegisterNewPayment(): void {
    const dialogRef = this.dialog.open(DialogPayFeeComponent, {
      width: '500px',
      data: { fee: this.fee },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((resp) => resp && this.getPayments());
  }

  getFee(): void {
    this.feeService.getOne(this.fee.id).subscribe((resp) => (this.fee = resp));
  }

  getPayments(): void {
    this.paymentService
      .getByConcept(this.fee.id, PaymentConceptEnum.FEE)
      .subscribe((resp) => {
        this.payments = resp;
        this.calculateDebt(this.payments);
      });
  }

  afterUpdatePayment(updated: boolean): void {
    this.getFee();
    this.getPayments();
  }

  calculateDebt(payments: PaymentModel[]): void {
    let sum = 0;
    payments.forEach((payment) => {
      if (payment.status == 'VERIFICADO') {
        this.paymentStatus = sum += payment.amount;
      }
    });
  }
}
