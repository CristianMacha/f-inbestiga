import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";

import { BackofficeComponent } from './backoffice.component';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import {MaterialModule} from "../material/material.module";
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    BackofficeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    BackofficeRoutingModule,
    SharedModule,
    MaterialModule,
  ]
})
export class BackofficeModule { }
