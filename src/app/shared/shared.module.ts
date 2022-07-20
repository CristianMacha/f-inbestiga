import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {BackofficeNavComponent} from './components/backoffice-nav/backoffice-nav.component';
import {InvoiceListComponent} from './components/invoice-list/invoice-list.component';
import {ProjectDetailComponent} from './components/project-detail/project-detail.component';
import { InvoiceDetailComponent } from './components/invoice-detail/invoice-detail.component';

const COMPONENTS_SHARED = [
  BackofficeNavComponent,
  InvoiceListComponent,
  ProjectDetailComponent,
  InvoiceDetailComponent
]

@NgModule({
  declarations: [COMPONENTS_SHARED],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [COMPONENTS_SHARED]
})
export class SharedModule {
}
