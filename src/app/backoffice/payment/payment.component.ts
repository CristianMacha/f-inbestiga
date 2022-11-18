import {AfterContentInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";

import {AppStatePaymentFeature} from "./store/payment.reducers";
import {paymentFeatureInvoice, paymentFeatureShowInvoiceDetail} from "./store/payment.selectors";
import {Invoice} from "@core/models";
import {activeShowInvoiceDetail} from "./store/payment.actions";
import {MatDialog} from "@angular/material/dialog";
import {
  DialogPaymentMethodsComponent
} from "../../shared/dialogs/dialog-payment-methods/dialog-payment-methods.component";
import { BreadCrumbService } from '@core/services';

@Component({
  selector: 'vs-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy, AfterContentInit {
  subscription: Subscription = new Subscription();

  showInvoiceDetail: boolean = false;
  invoice: Invoice = new Invoice();

  constructor(
    private store: Store<AppStatePaymentFeature>,
    private dialog: MatDialog,
    private breadcrumbService: BreadCrumbService,
    ) {
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

  ngAfterContentInit(): void {
    this.breadcrumbService.setTitle('Pagos');
  }

  getInvoice() {
    this.subscription.add(
      this.store.select(paymentFeatureInvoice).subscribe(invoice => this.invoice = invoice),
    )
  }

  handleArrowBack(): void {
    this.store.dispatch(activeShowInvoiceDetail({active: false}));
  }

  handlePaymentMethods(): void {
    this.dialog.open(DialogPaymentMethodsComponent, {
      width: '650px'
    })
  }

}
