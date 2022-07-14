import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { BackofficeComponent } from './backoffice.component';

const routes: Routes = [
  {
    path: '',
    component: BackofficeComponent,
    canLoad: [AuthGuard],
    children: [
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(user => user.UserModule),
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(category => category.CategoryModule),
      },
      {
        path: 'project',
        loadChildren: () => import('./project/project.module').then(project => project.ProjectModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(profile => profile.ProfileModule),
      },
      {
        path: 'pagos',
        loadChildren: () => import('./payment/payment.module').then(payment => payment.PaymentModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(dashboard => dashboard.DashboardModule),
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
