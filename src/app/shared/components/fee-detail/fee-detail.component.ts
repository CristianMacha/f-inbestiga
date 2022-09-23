import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Fee, PaymentModel } from '@core/models';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { CFeeStatus, CRole, PaymentConceptEnum } from '@core/enums';
import { FeeService, PaymentService } from '@core/services';
import { DialogPayFeeComponent } from '../../dialogs/dialog-pay-fee/dialog-pay-fee.component';
import { DialogFeeEditComponent } from '../../dialogs/dialog-fee-edit/dialog-fee-edit.component';

@Component({
  selector: 'vs-fee-detail',
  templateUrl: './fee-detail.component.html',
  styleUrls: ['./fee-detail.component.scss'],
})
export class FeeDetailComponent implements OnInit {
  @Output() invoiceId: EventEmitter<number> = new EventEmitter();
  @Input() fee!: Fee;

  title: string = 'PENDIENTE';
  cFeeStatus = CFeeStatus;
  cRole = CRole;
  payments: PaymentModel[] = [];
  paymentStatus: any;
  invoiceIdActive!: number;
  idUser:any="";
  constructor(
    private dialog: MatDialog,
    private paymentService: PaymentService,
    private feeService: FeeService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((resp) => this.invoiceIdActive = resp['id']);
    this.getPayments();
    this.idUser=localStorage.getItem('rId');

  }

  handleBtnEditFee(): void {
    const dialogRef = this.dialog.open(DialogFeeEditComponent, {
      width: '500px',
      data: { feeId: this.fee.id },
      autoFocus: false,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((resp) => {
      if(resp) {
        this.getFee();
        this.invoiceId.emit(resp.id);
      }
    })
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
    this.invoiceId.emit(this.invoiceIdActive);
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
