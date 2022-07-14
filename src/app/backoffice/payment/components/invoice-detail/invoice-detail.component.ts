import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";

import {AppStatePaymentFeature} from "../../store/payment.reducers";
import {loadPayment} from "../../store/payment.actions";
import {paymentFeatureInvoice} from "../../store/payment.selectors";
import {Invoice} from "@core/models";

@Component({
  selector: 'vs-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit, OnDestroy {
  @Input() invoiceId: number = 0;

  subscription: Subscription = new Subscription();
  invoice: Invoice = new Invoice();

  constructor(private store: Store<AppStatePaymentFeature>) { }

  ngOnInit(): void {
    this.store.dispatch(loadPayment({invoiceId: this.invoiceId}));
    this.getInvoice();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getInvoice(): void {
    this.subscription.add(
      this.store.select(paymentFeatureInvoice).subscribe(invoice => this.invoice = invoice)
    )
  }

}
