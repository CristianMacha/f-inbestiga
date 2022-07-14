import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

import {Invoice} from "@core/models";
import {AppStatePaymentFeature} from "../../store/payment.reducers";
import {loadPayments, selectPayment} from "../../store/payment.actions";
import {paymentFeatureInvoices} from "../../store/payment.selectors";

@Component({
  selector: 'vs-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss']
})
export class PaymentTableComponent implements OnInit {
  invoices$: Observable<Invoice[]> = new Observable();

  constructor(private store: Store<AppStatePaymentFeature>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadPayments());
    this.invoices$ = this.store.select(paymentFeatureInvoices);
  }

  handleViewPayment(payment: Invoice) {
    this.store.dispatch(selectPayment({invoice: payment}));
  }

}
