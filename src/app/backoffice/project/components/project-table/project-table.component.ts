import {Component, OnInit, ViewChild} from '@angular/core';
import {finalize, Observable, skip, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

import {Project, Role} from '@core/models';
import {AppStateProjectFeature} from '../../store/project.reducers';
import {activeFormUpdate, loadProjects, loadProjectsFilter} from '../../store/project.actions';
import {projectFeatureProjects} from '../../store/project.selectors';
import {uiRoleSelected} from "../../../../shared/ui.selectors";
import {CProjectStatus, CRole, EProjectStatus} from "@core/enums";
import {ProjectService} from "@core/services";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'vs-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss']
})
export class ProjectTableComponent implements OnInit {
  subscription: Subscription = new Subscription();

  projects: Project[] = [];
  displayedColumns: string[] = ['code', 'name', 'description', 'expirationDate', 'status', 'actions'];
  resultsLength = 0;
  isLoadingResults = true;

  cProjectStatus = CProjectStatus;
  roleSelected: Role = new Role();
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

  handleBtnEdit(project: Project) {
    this.store.dispatch(activeFormUpdate({project}));
  }

  handleViewProject(projectId: number): void {
    this.router.navigateByUrl(`backoffice/project/${projectId}`);
  }

  getProjects(take: number, skip: number): void {
    this.isLoadingResults = true;
    this.projectService.getProjects(this.roleSelected.id, { status: EProjectStatus.ALL, take, skip })
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
        this.getProjects(30, 0);
      })
    );
  }

  pageEvent(event: PageEvent) {
    this.getProjects(event.pageSize, event.pageIndex);
  }
}
