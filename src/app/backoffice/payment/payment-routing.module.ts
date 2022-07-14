import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {PaymentComponent} from "./payment.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PaymentComponent,
        title: 'Pagos'
      }
    ],
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class PaymentRoutingModule {
}
