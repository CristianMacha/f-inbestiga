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
        data: { title: 'Usuarios' } ,
      },
      {
        path: 'category',
        canLoad: [AuthGuard, ResourceGuard],
        loadChildren: () => import('./category/category.module').then(category => category.CategoryModule),
        data: { title: 'Categoria' } ,
      },
      {
        path: 'project',
        canLoad: [AuthGuard, ResourceGuard],
        loadChildren: () => import('./project/project.module').then(project => project.ProjectModule),
        data: { title: 'Proyecto' } ,
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(profile => profile.ProfileModule),
        data: { title: 'Perfil' } ,
      },
      {
        path: 'pagos',
        canLoad: [AuthGuard, ResourceGuard],
        loadChildren: () => import('./payment/payment.module').then(payment => payment.PaymentModule),
        data: { title: 'Pagos' } ,
      },
      {
        path: 'dashboard',
        canLoad: [AuthGuard, ResourceGuard],
        loadChildren: () => import('./dashboard/dashboard.module').then(dashboard => dashboard.DashboardModule),
        data: { title: 'Inicio' } ,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
        data: { title: 'Inicio' } ,
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
