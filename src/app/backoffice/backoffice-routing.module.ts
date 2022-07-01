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
        path: 'perfil',
        loadChildren: () => import('./profile/profile.module').then(profile => profile.ProfileModule),
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
