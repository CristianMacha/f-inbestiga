import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from './category.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CategoryComponent,
        title: 'Categorias'
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
