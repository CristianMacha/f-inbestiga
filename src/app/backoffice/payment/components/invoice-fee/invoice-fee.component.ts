import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";

import {AppStatePaymentFeature} from "../../store/payment.reducers";

@Component({
  selector: 'vs-invoice-fee',
  templateUrl: './invoice-fee.component.html',
  styleUrls: ['./invoice-fee.component.scss']
})
export class InvoiceFeeComponent implements OnInit, OnDestroy {
  @Input() invoiceId: number = 0;

  constructor(private store: Store<AppStatePaymentFeature>) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }
}
