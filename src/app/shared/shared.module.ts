import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {BackofficeNavComponent} from './components/backoffice-nav/backoffice-nav.component';
import {ProjectListComponent} from './components/project-list/project-list.component';
import {InvoiceListComponent} from './components/invoice-list/invoice-list.component';

const COMPONENTS_SHARED = [
  ProjectListComponent,
  BackofficeNavComponent,
  InvoiceListComponent
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
