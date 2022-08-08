import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(auth => auth.AuthModule),
  },
  {
    path: 'backoffice',
    canLoad: [AuthGuard],
    loadChildren: () => import('./backoffice/backoffice.module').then(backoffice => backoffice.BackofficeModule),
  },
  {
    path: '',
    redirectTo: 'backoffice',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
