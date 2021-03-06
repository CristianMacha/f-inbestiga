import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UserComponent,
        title: 'Usuarios'
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
