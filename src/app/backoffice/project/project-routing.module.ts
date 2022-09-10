import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { ProjectRegistrationComponent } from './pages/project-registration/project-registration.component';

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
        path: 'detalles/:id',
        component: ProjectDetailComponent,
        title: 'Detalles del proyecto'
      },
      {
        path: ':id',
        component: ProjectRegistrationComponent,
        title: 'Registro de proyecto',
      },
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class ProjectRoutingModule { }
