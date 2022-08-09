import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Store} from "@ngrx/store";
import {finalize, Subscription} from "rxjs";

import {ProjectService} from "@core/services";
import {EProjectStatus, ERole} from "@core/enums";
import {Project} from "@core/models";
import {appState} from "../../../../app.reducers";
import {uiRoleSelected} from "../../../../shared/ui.selectors";

@Component({
  selector: 'vs-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  resultsLength = 0;
  projects: Project[] = [];
  loading: boolean = false;

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

  getProjects(roleId: number, take: number = 3, skip = 0): void {
    this.loading = true;
    this.projectService.getProjects(roleId, { status: EProjectStatus.ALL, take, skip})
      .pipe(finalize(() => this.loading = false))
      .subscribe((resp) => {
        this.resultsLength = resp.total;
        this.projects = resp.data;
      });
  }

  pageEvent(event: PageEvent) {
    this.getProjects(ERole.ADMINISTRATOR, event.pageSize, event.pageIndex);
  }

}
