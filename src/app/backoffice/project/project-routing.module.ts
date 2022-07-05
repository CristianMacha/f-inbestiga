import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectComponent } from './project.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProjectComponent,
        title: 'Projectos',
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class ProjectRoutingModule { }
