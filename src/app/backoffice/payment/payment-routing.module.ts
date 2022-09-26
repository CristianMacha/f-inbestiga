import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {PaymentComponent} from "./payment.component";
import {PaymentDetailComponent} from "./pages/payment-detail/payment-detail.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PaymentComponent,
        title: 'Pagos'
      },
      {
        path: ':id',
        component: PaymentDetailComponent,
        title: 'Detalles de factura'
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
