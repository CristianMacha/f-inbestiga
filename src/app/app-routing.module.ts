import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(auth => auth.AuthModule),
  },
  {
    path: 'backoffice',
    loadChildren: () => import('./backoffice/backoffice.module').then(backoffice => backoffice.BackofficeModule),
  },
  {
    path: '',
    redirectTo: 'backoffice',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
