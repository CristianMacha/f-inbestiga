import {Component, OnInit} from '@angular/core';
import {finalize, Subscription} from "rxjs";
import {Store} from "@ngrx/store";

import {ProjectService} from "@core/services";
import {appState} from "../../../../app.reducers";
import {EProjectStatus, ERole} from "@core/enums";
import {Project} from "@core/models";
import {uiRoleSelected} from "../../../../shared/ui.selectors";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'vs-dashboard-advisor',
  templateUrl: './dashboard-advisor.component.html',
  styleUrls: ['./dashboard-advisor.component.scss']
})
export class DashboardAdvisorComponent implements OnInit {
  subscription: Subscription = new Subscription();
  projects: Project[] = [];
  resultsLength = 0;
  loading: boolean = false;

  constructor(
    private store: Store<appState>,
    private projectService: ProjectService,
  ) {
  }

  ngOnInit(): void {
    this.getUiRoleSelected();
  }

  getUiRoleSelected(): void {
    this.subscription.add(
      this.store.select(uiRoleSelected).subscribe((role) => this.getProjects(role.id))
    );
  }

  getProjects(roleId: number, take: number = 3, skip = 0): void {
    this.loading = true;
    this.projectService.getProjects(roleId, {status: EProjectStatus.ALL, take, skip})
      .pipe(finalize(() => this.loading = false))
      .subscribe((resp) => {
        this.resultsLength = resp.total;
        this.projects = resp.data;
      });
  }

  pageEvent(event: PageEvent) {
    this.getProjects(ERole.ADVISOR, event.pageSize, event.pageIndex);
  }

}
