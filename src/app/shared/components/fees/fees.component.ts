import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";

import {FeeService} from "@core/services";
import {Fee} from "@core/models";
import {CFeeStatus, EStorage} from "@core/enums";
import {DialogPayFeeComponent} from "../../dialogs/dialog-pay-fee/dialog-pay-fee.component";
import {DialogVerifyPaymentComponent} from "../../dialogs/dialog-verify-payment/dialog-verify-payment.component";
import {IDialogVerifyPayment} from "@core/interfaces";
import {AppStatePaymentFeature} from "../../../backoffice/payment/store/payment.reducers";

@Component({
  selector: 'vs-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.scss']
})
export class FeesComponent implements OnInit, OnDestroy {
  @Output() paidOut: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() invoiceId: number = 0;
  subscription: Subscription = new Subscription();

  fees: Fee[] = [];
  cFeeStatus = CFeeStatus;

  constructor(
    public dialog: MatDialog,
    private feeService: FeeService,
    private storage: AngularFireStorage,
    private store: Store<AppStatePaymentFeature>
  ) {
  }

  ngOnInit(): void {
    this.getFees();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getFees(): void {
    this.feeService.getByInvoice(this.invoiceId)
      .subscribe((resp) => this.fees = resp);
  }

  handlePay(fee: Fee): void {
    const dialogRef = this.dialog.open(DialogPayFeeComponent, {
      width: '400px',
      data: {fee}
    });
    this.subscription.add(
      dialogRef.afterClosed().subscribe((resp) => resp && this.getFees())
    );
  }

  openFile(feeCode: string): void {
    const ref = this.storage.ref(`${EStorage.REF_VOUCHER}/${feeCode}`);
    this.subscription.add(
      ref.getDownloadURL().subscribe({
        next: (url) => (window.open(url, '_blank'))
      })
    );
  }

  handleVerifyPayment(feeId: number, accepted: boolean): void {
    const newDialogContent: IDialogVerifyPayment = {
      title: accepted ? 'Aceptar pago' : 'Rechazar pago',
      accepted,
    };

    const dialogRef = this.dialog.open(DialogVerifyPaymentComponent, {
      width: '400px',
      data: newDialogContent
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((resp) => {
        this.updateStatus(feeId, resp);
      })
    );
  }

  updateStatus(feeId: number, fee: Fee): void {
    this.feeService.validate(feeId, fee)
      .subscribe((resp) => {
        this.getFees();
        this.paidOut.emit(true);
      })
  }
}
