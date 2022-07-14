import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";

import {AppStatePaymentFeature} from "./store/payment.reducers";
import {paymentFeatureInvoice, paymentFeatureShowInvoiceDetail} from "./store/payment.selectors";
import {Invoice} from "@core/models";
import {activeShowInvoiceDetail} from "./store/payment.actions";

@Component({
  selector: 'vs-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  showInvoiceDetail: boolean = false;
  invoice: Invoice = new Invoice();

  constructor(private store: Store<AppStatePaymentFeature>) {
  }

  ngOnInit(): void {
    this.subscription.add(
      this.store.select(paymentFeatureShowInvoiceDetail).subscribe(resp => this.showInvoiceDetail = resp)
    )
    this.getInvoice();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getInvoice() {
    this.subscription.add(
      this.store.select(paymentFeatureInvoice).subscribe(invoice => this.invoice = invoice),
    )
  }

  handleArrowBack(): void {
    this.store.dispatch(activeShowInvoiceDetail({active: false}));
  }

}
