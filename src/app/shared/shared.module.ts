import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";

import {BackofficeNavComponent} from './components/backoffice-nav/backoffice-nav.component';
import {ProjectDetailComponent} from './components/project-detail/project-detail.component';
import {InvoiceDetailComponent} from './components/invoice-detail/invoice-detail.component';
import {MaterialModule} from "../material/material.module";
import {DialogPaymentMethodsComponent} from './dialogs/dialog-payment-methods/dialog-payment-methods.component';
import {DialogPayFeeComponent} from './dialogs/dialog-pay-fee/dialog-pay-fee.component';
import {DialogVerifyPaymentComponent} from './dialogs/dialog-verify-payment/dialog-verify-payment.component';
import {DialogRequestProjectComponent} from './dialogs/dialog-request-project/dialog-request-project.component';
import {DialogAcceptProjectComponent} from './dialogs/dialog-accept-project/dialog-accept-project.component';
import {DialogConfirmComponent} from './dialogs/dialog-confirm/dialog-confirm.component';
import {SearchPersonComponent} from './components/search-person/search-person.component';
import {DialogPersonFormComponent} from './dialogs/dialog-person-form/dialog-person-form.component';
import {DialogPaymentComponent} from './dialogs/dialog-payment/dialog-payment.component';
import {FeeDetailComponent} from './components/fee-detail/fee-detail.component';
import {FeePaymentComponent} from './components/fee-payment/fee-payment.component';
import { DialogRolesComponent } from './dialogs/dialog-roles/dialog-roles.component';
import { DialogPaymentUpdateComponent } from './dialogs/dialog-payment-update/dialog-payment-update.component';
import { DialogProjectEditTotalComponent } from './dialogs/dialog-project-edit-total/dialog-project-edit-total.component';
import { DialogProjectUpdateDocComponent } from './dialogs/dialog-project-update-doc/dialog-project-update-doc.component';
import { Error404Component } from './components/error404/error404.component';


const COMPONENTS_SHARED = [
  BackofficeNavComponent,
  ProjectDetailComponent,
  InvoiceDetailComponent,
  DialogPaymentMethodsComponent,
  DialogPayFeeComponent,
  DialogVerifyPaymentComponent,
  DialogRequestProjectComponent,
  DialogAcceptProjectComponent,
  DialogConfirmComponent,
  SearchPersonComponent,
  DialogPersonFormComponent,
  DialogPaymentComponent,
  FeeDetailComponent,
  FeePaymentComponent,
]

@NgModule({
  declarations: [COMPONENTS_SHARED, DialogRolesComponent, DialogPaymentUpdateComponent, DialogProjectEditTotalComponent,DialogProjectUpdateDocComponent, Error404Component ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [COMPONENTS_SHARED, FeeDetailComponent,Error404Component]
})
export class SharedModule {
}
