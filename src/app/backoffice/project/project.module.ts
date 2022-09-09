import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {ProjectComponent} from './project.component';
import {ProjectTableComponent} from './components/project-table/project-table.component';
import {ProjectFormComponent} from './components/project-form/project-form.component';
import {ProjectRoutingModule} from './project-routing.module';
import {ProjectDetailComponent} from './pages/project-detail/project-detail.component';
import {ProjectTimelineComponent} from './components/project-timeline/project-timeline.component';
import {ProjectCommentsComponent} from './components/project-comments/project-comments.component';
import {CoreModule} from '../../core/core.module';
import {
  ProjectRequirementFormComponent
} from './components/project-requirement-form/project-requirement-form.component';
import {projectFeatureKey, _projectReducer} from './store/project.reducers';
import {ProjectEffects} from './store/project.effects';
import {ProjectInfoComponent} from './components/project-info/project-info.component';
import {ProjectFilterComponent} from './components/project-filter/project-filter.component';
import {MaterialModule} from "../../material/material.module";
import { ProjectDocumentComponent } from './components/project-document/project-document.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectTableComponent,
    ProjectFormComponent,
    ProjectDetailComponent,
    ProjectTimelineComponent,
    ProjectCommentsComponent,
    ProjectRequirementFormComponent,
    ProjectInfoComponent,
    ProjectFilterComponent,
    ProjectDocumentComponent
  ],
  exports: [
    ProjectDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProjectRoutingModule,
    StoreModule.forFeature(projectFeatureKey, _projectReducer),
    EffectsModule.forFeature([ProjectEffects]),
    CoreModule,
    SharedModule,
    MaterialModule,
  ]
})
export class ProjectModule {
}
