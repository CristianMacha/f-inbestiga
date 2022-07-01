import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackofficeComponent } from './backoffice.component';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    BackofficeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BackofficeRoutingModule,
    SharedModule,
  ]
})
export class BackofficeModule { }
