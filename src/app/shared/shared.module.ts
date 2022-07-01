import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackofficeNavComponent } from './components/backoffice-nav/backoffice-nav.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BackofficeNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    BackofficeNavComponent
  ]
})
export class SharedModule { }
