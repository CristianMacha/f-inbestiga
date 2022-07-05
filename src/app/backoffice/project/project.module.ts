import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { ProjectComponent } from './project.component';
import { ProjectTableComponent } from './components/project-table/project-table.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { ProjectRoutingModule } from './project-routing.module';
import { projectFeatureKey, _projectReducer } from './store/project.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProjectEffects } from './store/project.effects';



@NgModule({
  declarations: [
    ProjectComponent,
    ProjectTableComponent,
    ProjectFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProjectRoutingModule,
    StoreModule.forFeature(projectFeatureKey, _projectReducer),
    EffectsModule.forFeature([ProjectEffects]),
  ]
})
export class ProjectModule { }
