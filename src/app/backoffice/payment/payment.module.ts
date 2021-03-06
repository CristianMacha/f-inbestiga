import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";

import {PaymentComponent} from './payment.component';
import {PaymentRoutingModule} from "./payment-routing.module";
import {_paymentReducer, paymentFeatureKey} from "./store/payment.reducers";
import {PaymentEffects} from "./store/payment.effects";
import {PaymentTableComponent} from './components/payment-table/payment-table.component';
import {InvoiceFeeComponent} from './components/invoice-fee/invoice-fee.component';
import {SharedModule} from "../../shared/shared.module";
import {MaterialModule} from "../../material/material.module";

@NgModule({
  declarations: [
    PaymentComponent,
    PaymentTableComponent,
    InvoiceFeeComponent
  ],
  exports: [
    InvoiceFeeComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    StoreModule.forFeature(paymentFeatureKey, _paymentReducer),
    EffectsModule.forFeature([PaymentEffects]),
    SharedModule,
    MaterialModule,
  ]
})
export class PaymentModule {
}
