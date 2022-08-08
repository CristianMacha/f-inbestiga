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
  pageSize = 30;
  pageIndex = 0;
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
        this.resultsLength > 1 && this.paginator.firstPage();
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
      this.store.select(uiRoleSelected).subscribe((resp) => {
        this.roleSelected = resp;
        this.roleSelected.id > 0 && this.getFilterState();
      })
    );
  }

  pageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getProjects(this.pageSize, this.pageIndex);
  }
}
