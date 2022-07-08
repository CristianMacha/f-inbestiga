import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';

import { ProjectComponent } from './project.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProjectComponent,
        title: 'Projectos',
      },
      {
        path: ':id',
        component: ProjectDetailComponent,
        title: 'Detalles del proyecto'
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
