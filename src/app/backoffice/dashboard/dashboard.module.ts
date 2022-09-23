import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {DashboardStudentComponent} from './layouts/dashboard-student/dashboard-student.component';
import {DashboardAdvisorComponent} from './layouts/dashboard-advisor/dashboard-advisor.component';
import {DashboardAdminComponent} from './layouts/dashboard-admin/dashboard-admin.component';
import {MaterialModule} from "../../material/material.module";
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardStudentComponent,
    DashboardAdvisorComponent,
    DashboardAdminComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MaterialModule,
  ]
})
export class DashboardModule {
}
