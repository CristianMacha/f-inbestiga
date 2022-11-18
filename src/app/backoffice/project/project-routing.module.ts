import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectFormComponent } from './components/project-form/project-form.component';
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
        path: 'register',
        component: ProjectRegistrationComponent,
        title: 'Registro de proyecto',
        data: { title: 'Registro' }
      },
      {
        path: 'edit/:id',
        component: ProjectFormComponent,
        title: 'Editar proyecto'
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
