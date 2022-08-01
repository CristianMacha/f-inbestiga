import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";

import {BackofficeNavComponent} from './components/backoffice-nav/backoffice-nav.component';
import {ProjectDetailComponent} from './components/project-detail/project-detail.component';
import {InvoiceDetailComponent} from './components/invoice-detail/invoice-detail.component';
import {MaterialModule} from "../material/material.module";
import {DialogPaymentMethodsComponent} from './dialogs/dialog-payment-methods/dialog-payment-methods.component';
import {FeesComponent} from './components/fees/fees.component';
import {DialogPayFeeComponent} from './dialogs/dialog-pay-fee/dialog-pay-fee.component';
import {DialogVerifyPaymentComponent} from './dialogs/dialog-verify-payment/dialog-verify-payment.component';
import {DialogRequestProjectComponent} from './dialogs/dialog-request-project/dialog-request-project.component';
import { DialogAcceptProjectComponent } from './dialogs/dialog-accept-project/dialog-accept-project.component';
import { DialogConfirmComponent } from './dialogs/dialog-confirm/dialog-confirm.component';

const COMPONENTS_SHARED = [
  BackofficeNavComponent,
  ProjectDetailComponent,
  InvoiceDetailComponent,
  DialogPaymentMethodsComponent,
  FeesComponent,
  DialogPayFeeComponent,
  DialogVerifyPaymentComponent,
  DialogRequestProjectComponent
]

@NgModule({
  declarations: [COMPONENTS_SHARED, DialogAcceptProjectComponent, DialogConfirmComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [COMPONENTS_SHARED]
})
export class SharedModule {
}
