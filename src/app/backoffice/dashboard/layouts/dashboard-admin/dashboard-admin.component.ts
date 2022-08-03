import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";

import {appState} from "../../../../app.reducers";
import {ProjectService} from "@core/services";
import {Subscription} from "rxjs";
import {Project} from "@core/models";
import {uiRoleSelected} from "../../../../shared/ui.selectors";
import {EProjectStatus} from "@core/enums";

@Component({
  selector: 'vs-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private store: Store<appState>
  ) { }

  ngOnInit(): void {
    this.getRoleSelected();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getRoleSelected(): void {
    this.subscription.add(
      this.store.select(uiRoleSelected).subscribe((role) => this.getProjects(role.id))
    )
  }

  getProjects(roleId: number): void {
    this.projectService.getProjects(roleId, { status: EProjectStatus.ALL, take: 10, skip: 0})
      .subscribe((resp) => this.projects = resp.data);
  }

}
