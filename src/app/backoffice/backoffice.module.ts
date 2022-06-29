import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackofficeComponent } from './backoffice.component';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BackofficeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BackofficeRoutingModule,
  ]
})
export class BackofficeModule { }
