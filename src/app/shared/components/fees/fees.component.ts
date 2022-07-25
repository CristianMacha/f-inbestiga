import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AngularFireStorage} from "@angular/fire/compat/storage";

import {FeeService} from "@core/services";
import {Fee} from "@core/models";
import {CFeeStatus, EStorage} from "@core/enums";
import {DialogPayFeeComponent} from "../../dialogs/dialog-pay-fee/dialog-pay-fee.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'vs-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.scss']
})
export class FeesComponent implements OnInit, OnDestroy {
  @Input() invoiceId: number = 0;
  subscription: Subscription = new Subscription();

  fees: Fee[] = [];
  cFeeStatus = CFeeStatus;

  constructor(
    public dialog: MatDialog,
    private feeService: FeeService,
    private storage: AngularFireStorage,
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

}
