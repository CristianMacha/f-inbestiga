import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { BackofficeComponent } from './backoffice.component';

const routes: Routes = [
  {
    path: '',
    component: BackofficeComponent,
    children: [
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(user => user.UserModule),
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class BackofficeRoutingModule { }
