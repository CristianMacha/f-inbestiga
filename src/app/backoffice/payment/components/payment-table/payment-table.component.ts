import {Component, OnInit} from '@angular/core';
import {createAction, Store} from "@ngrx/store";
import {Observable, Subscription} from "rxjs";

import {Invoice, Role} from "@core/models";
import {AppStatePaymentFeature} from "../../store/payment.reducers";
import {activeShowInvoiceDetail, loadPayments, selectPayment} from "../../store/payment.actions";
import {paymentFeatureInvoices} from "../../store/payment.selectors";
import {CInvoiceStatus} from "../../../../core/enums/invoice.enum";
import {uiRoleSelected} from "../../../../shared/ui.selectors";
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceService } from '@core/services';

@Component({
  selector: 'vs-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss']
})
export class PaymentTableComponent implements OnInit {
  subscription: Subscription = new Subscription();
  invoices$: Observable<Invoice[]> = new Observable();

  roleSelected!: Role;
  displayedColumns: string[] = ['code', 'project', 'total', 'status', 'feesNumber', 'expirationDate', 'actions'];
  cInvoiceStatus = CInvoiceStatus;

  constructor(
    private store: Store<AppStatePaymentFeature>,
    private invoiceService: InvoiceService,
    ) {
  }

  ngOnInit(): void {
    this.getUiRoleSelectedState();
    this.invoices$ = this.store.select(paymentFeatureInvoices);
  }

  handleBtnView(invoice: Invoice): void {
    this.store.dispatch(selectPayment({invoice}));
  }

  handleViewPayment(payment: Invoice) {
    this.store.dispatch(selectPayment({invoice: payment}));
  }

  getUiRoleSelectedState(): void {
    this.subscription.add(
      this.store.select(uiRoleSelected).subscribe((resp) => (resp.id) && this.store.dispatch(loadPayments( {roleId: resp.id})))
    )
  }

}
