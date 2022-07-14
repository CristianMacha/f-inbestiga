import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";

import {Fee} from "@core/models";
import {AppStatePaymentFeature} from "../../store/payment.reducers";
import {paymentFeatureFees} from "../../store/payment.selectors";
import {loadFees} from "../../store/payment.actions";

@Component({
  selector: 'vs-invoice-fee',
  templateUrl: './invoice-fee.component.html',
  styleUrls: ['./invoice-fee.component.scss']
})
export class InvoiceFeeComponent implements OnInit, OnDestroy {
  @Input() invoiceId: number = 0;

  subscription: Subscription = new Subscription();
  fees: Fee[] = [];

  constructor(private store: Store<AppStatePaymentFeature>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadFees({invoiceId: this.invoiceId}));
    this.getFees();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getFees(): void {
    this.subscription.add(
      this.store.select(paymentFeatureFees).subscribe(fees => this.fees = fees),
    )
  }

}
