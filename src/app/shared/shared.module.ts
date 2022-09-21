import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";

import { BackofficeNavComponent } from './components/backoffice-nav/backoffice-nav.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { InvoiceDetailComponent } from './components/invoice-detail/invoice-detail.component';
import { MaterialModule } from "../material/material.module";
import { DialogPaymentMethodsComponent } from './dialogs/dialog-payment-methods/dialog-payment-methods.component';
import { DialogPayFeeComponent } from './dialogs/dialog-pay-fee/dialog-pay-fee.component';
import { DialogVerifyPaymentComponent } from './dialogs/dialog-verify-payment/dialog-verify-payment.component';
import { DialogRequestProjectComponent } from './dialogs/dialog-request-project/dialog-request-project.component';
import { DialogAcceptProjectComponent } from './dialogs/dialog-accept-project/dialog-accept-project.component';
import { DialogConfirmComponent } from './dialogs/dialog-confirm/dialog-confirm.component';
import { SearchPersonComponent } from './components/search-person/search-person.component';
import { DialogPersonFormComponent } from './dialogs/dialog-person-form/dialog-person-form.component';
import { DialogPaymentComponent } from './dialogs/dialog-payment/dialog-payment.component';
import { FeeDetailComponent } from './components/fee-detail/fee-detail.component';
import { FeePaymentComponent } from './components/fee-payment/fee-payment.component';
import { DialogRolesComponent } from './dialogs/dialog-roles/dialog-roles.component';
import { DialogPaymentUpdateComponent } from './dialogs/dialog-payment-update/dialog-payment-update.component';
import { DialogProjectEditTotalComponent } from './dialogs/dialog-project-edit-total/dialog-project-edit-total.component';
import { DialogProjectUpdateDocComponent } from './dialogs/dialog-project-update-doc/dialog-project-update-doc.component';
import { Error404Component } from './components/error404/error404.component';
import { DialogUserPasswordComponent } from './dialogs/dialog-user-password/dialog-user-password.component';
import { DialogInvoiceEditComponent } from './dialogs/dialog-invoice-edit/dialog-invoice-edit.component';
import { DialogFeeEditComponent } from './dialogs/dialog-fee-edit/dialog-fee-edit.component';
import { FeeChatComponent } from './components/fee-chat/fee-chat.component';

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
  FeeChatComponent,
  FeePaymentComponent,
  DialogRolesComponent,
  DialogPaymentUpdateComponent,
  DialogProjectEditTotalComponent,
  DialogProjectUpdateDocComponent,
  Error404Component,
  DialogInvoiceEditComponent,
  DialogFeeEditComponent,
  DialogUserPasswordComponent
]

@NgModule({
  declarations: [COMPONENTS_SHARED],
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
