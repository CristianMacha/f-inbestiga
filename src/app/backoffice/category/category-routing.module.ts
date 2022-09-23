import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from './category.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CategoryComponent,
        title: 'Categorias'
      },
      {
        path: ':id',
        component: CategoryFormComponent,
        title: 'Detalles de la Categoria'
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
export class CategoryRoutingModule { }
