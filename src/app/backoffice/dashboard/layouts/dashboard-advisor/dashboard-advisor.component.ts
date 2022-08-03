import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";

import {ProjectService} from "@core/services";
import {appState} from "../../../../app.reducers";
import {EProjectStatus} from "@core/enums";
import {Project} from "@core/models";
import {uiRoleSelected} from "../../../../shared/ui.selectors";

@Component({
  selector: 'vs-dashboard-advisor',
  templateUrl: './dashboard-advisor.component.html',
  styleUrls: ['./dashboard-advisor.component.scss']
})
export class DashboardAdvisorComponent implements OnInit {
  subscription: Subscription =  new Subscription();
  projects: Project[] = [];

  constructor(
    private store: Store<appState>,
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.getUiRoleSelected();
  }

  getUiRoleSelected(): void {
    this.subscription.add(
      this.store.select(uiRoleSelected).subscribe((role) => this.getProjects(role.id))
    );
  }

  getProjects(roleId: number): void {
    this.projectService.getProjects(roleId, { status: EProjectStatus.ALL, take: 10, skip: 0})
      .subscribe((resp) => this.projects = resp.data);
  }

}
