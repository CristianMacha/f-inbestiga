import {Component, Input, OnInit} from '@angular/core';
import {Fee, PaymentModel} from "@core/models";
import {CFeeStatus, PaymentConceptEnum} from "@core/enums";
import {MatDialog} from "@angular/material/dialog";
import {DialogPayFeeComponent} from "../../dialogs/dialog-pay-fee/dialog-pay-fee.component";
import {FeeService, PaymentService} from "@core/services";

@Component({
  selector: 'vs-fee-detail',
  templateUrl: './fee-detail.component.html',
  styleUrls: ['./fee-detail.component.scss']
})
export class FeeDetailComponent implements OnInit {
  @Input() fee!: Fee;

  cFeeStatus = CFeeStatus;
  payments: PaymentModel[] = [];

  constructor(
    private dialog: MatDialog,
    private paymentService: PaymentService,
    private feeService: FeeService,
  ) {
  }

  ngOnInit(): void {
    this.getPayments();
  }

  handleRegisterNewPayment(): void {
    const dialogRef = this.dialog.open(DialogPayFeeComponent, {
      width: '500px',
      data: {fee: this.fee},
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((resp) => resp && this.getPayments());
  }

  getFee(): void {
    this.feeService.getOne(this.fee.id)
      .subscribe((resp) => this.fee = resp);
  }

  getPayments(): void {
    this.paymentService.getByConcept(this.fee.id, PaymentConceptEnum.FEE)
      .subscribe((resp) => this.payments = resp);
  }

  updatedPayment(updated: boolean): void {
    this.getFee();
    this.getPayments();
  }
}
