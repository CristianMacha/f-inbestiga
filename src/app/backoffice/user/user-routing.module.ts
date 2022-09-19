import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserFormComponent } from './components/user-form/user-form.component';

import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UserComponent,
        title: 'Usuarios'
      },
      {
        path: ':id',
        component: UserFormComponent,
        title: 'Actualizar del Usuario'
      }
      ,
      {
        path: 'detalle/:id',
        component: UserDetailComponent,
        title: 'Detalles del Usuario'
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class UserRoutingModule { }
