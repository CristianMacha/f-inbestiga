import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {finalize, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

import {Project, Role} from '@core/models';
import {AppStateProjectFeature} from '../../store/project.reducers';
import {activeFormUpdate} from '../../store/project.actions';
import {projectFeatureFilter} from '../../store/project.selectors';
import {uiRoleSelected} from "../../../../shared/ui.selectors";
import {CProjectStatus, CRole, EProjectStatus} from "@core/enums";
import {ProjectService} from "@core/services";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'vs-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss']
})
export class ProjectTableComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  projects: Project[] = [];
  displayedColumns: string[] = ['code', 'name', 'description', 'expirationDate', 'status', 'actions'];
  resultsLength = 0;
  isLoadingResults = true;

  cProjectStatus = CProjectStatus;
  roleSelected: Role = new Role();
  filterStatusSelected: EProjectStatus = EProjectStatus.ALL;
  cRole = CRole;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store: Store<AppStateProjectFeature>,
    private router: Router,
    private projectService: ProjectService,
  ) {
  }

  ngOnInit(): void {
    this.getRoleSelectedState();
    this.getFilterState();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleBtnEdit(project: Project) {
    this.store.dispatch(activeFormUpdate({project}));
  }

  getFilterState(): void {
    this.subscription.add(
      this.store.select(projectFeatureFilter).subscribe((resp) => {
        this.filterStatusSelected = resp.status;
        this.getProjects(resp.take, resp.skip);
      })
    );
  }

  handleViewProject(projectId: number): void {
    this.router.navigateByUrl(`backoffice/project/${projectId}`);
  }

  getProjects(take: number, skip: number): void {
    this.isLoadingResults = true;
    this.projectService.getProjects(this.roleSelected.id, { status: this.filterStatusSelected, take, skip })
      .pipe(finalize(() => this.isLoadingResults = false))
      .subscribe((resp) => {
        this.projects = resp.data;
        this.resultsLength = resp.total;
      });
  }

  getRoleSelectedState(): void {
    this.subscription.add(
      this.store.select(uiRoleSelected).subscribe((resp) => this.roleSelected = resp)
    );
  }

  pageEvent(event: PageEvent) {
    this.getProjects(event.pageSize, event.pageIndex);
  }
}
