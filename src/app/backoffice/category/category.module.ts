import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryComponent } from './category.component';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryTableComponent } from './components/category-table/category-table.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { StoreModule } from '@ngrx/store';
import { categoryFeatureKey, _categoryReducer } from './store/category.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CategoryEffects } from './store/category.effects';

@NgModule({
  declarations: [
    CategoryComponent,
    CategoryTableComponent,
    CategoryFormComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    StoreModule.forFeature(categoryFeatureKey,_categoryReducer),
    EffectsModule.forFeature([CategoryEffects])
  ]
})
export class CategoryModule { }
