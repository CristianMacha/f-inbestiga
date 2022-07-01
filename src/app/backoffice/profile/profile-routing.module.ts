import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProfileComponent,
        title: 'Perfil',
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class ProfileRoutingModule { }
