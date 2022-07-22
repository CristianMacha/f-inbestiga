import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {BackofficeNavComponent} from './components/backoffice-nav/backoffice-nav.component';
import {ProjectDetailComponent} from './components/project-detail/project-detail.component';
import { InvoiceDetailComponent } from './components/invoice-detail/invoice-detail.component';
import {MaterialModule} from "../material/material.module";
import { DialogInvoicePaymentComponent } from './dialogs/dialog-invoice-payment/dialog-invoice-payment.component';

const COMPONENTS_SHARED = [
  BackofficeNavComponent,
  ProjectDetailComponent,
  InvoiceDetailComponent
]

@NgModule({
  declarations: [COMPONENTS_SHARED, DialogInvoicePaymentComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [COMPONENTS_SHARED]
})
export class SharedModule {
}
