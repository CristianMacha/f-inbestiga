import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable, Subscription} from "rxjs";

import {Invoice} from "@core/models";
import {AppStatePaymentFeature} from "../../store/payment.reducers";
import {loadPayments, selectPayment} from "../../store/payment.actions";
import {paymentFeatureInvoices} from "../../store/payment.selectors";
import {CInvoiceStatus} from "../../../../core/enums/invoice.enum";
import {uiRoleSelected} from "../../../../shared/ui.selectors";

@Component({
  selector: 'vs-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss']
})
export class PaymentTableComponent implements OnInit {
  subscription: Subscription = new Subscription();
  invoices$: Observable<Invoice[]> = new Observable();

  cInvoiceStatus = CInvoiceStatus;

  constructor(private store: Store<AppStatePaymentFeature>) {
  }

  ngOnInit(): void {
    this.getUiRoleSelectedState();
    this.invoices$ = this.store.select(paymentFeatureInvoices);
  }

  handleViewPayment(payment: Invoice) {
    this.store.dispatch(selectPayment({invoice: payment}));
  }

  getUiRoleSelectedState(): void {
    this.subscription.add(
      this.store.select(uiRoleSelected).subscribe((resp) => resp.id && this.store.dispatch(loadPayments( {roleId: resp.id})))
    )
  }

}
