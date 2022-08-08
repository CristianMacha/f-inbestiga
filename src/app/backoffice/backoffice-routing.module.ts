import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { BackofficeComponent } from './backoffice.component';
import {ResourceGuard} from "../core/guards/resource.guard";

const routes: Routes = [
  {
    path: '',
    component: BackofficeComponent,
    canLoad: [AuthGuard, ResourceGuard],
    children: [
      {
        path: 'user',
        canLoad: [AuthGuard, ResourceGuard],
        loadChildren: () => import('./user/user.module').then(user => user.UserModule),
      },
      {
        path: 'category',
        canLoad: [AuthGuard, ResourceGuard],
        loadChildren: () => import('./category/category.module').then(category => category.CategoryModule),
      },
      {
        path: 'project',
        canLoad: [AuthGuard, ResourceGuard],
        loadChildren: () => import('./project/project.module').then(project => project.ProjectModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(profile => profile.ProfileModule),
      },
      {
        path: 'pagos',
        canLoad: [AuthGuard, ResourceGuard],
        loadChildren: () => import('./payment/payment.module').then(payment => payment.PaymentModule),
      },
      {
        path: 'dashboard',
        canLoad: [AuthGuard, ResourceGuard],
        loadChildren: () => import('./dashboard/dashboard.module').then(dashboard => dashboard.DashboardModule),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
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
