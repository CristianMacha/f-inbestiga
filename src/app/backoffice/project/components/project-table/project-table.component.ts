import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {finalize, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";

import {CProjectStatus, CRole, EProjectStatus} from "@core/enums";
import {IDialogConfirm} from "@core/interfaces";
import {ProjectService} from "@core/services";
import {Project, Role} from '@core/models';
import {AppStateProjectFeature} from '../../store/project.reducers';
import {activeFormUpdate} from '../../store/project.actions';
import {projectFeatureFilter} from '../../store/project.selectors';
import {uiRoleSelected} from "../../../../shared/ui.selectors";
import {DialogConfirmComponent} from "../../../../shared/dialogs/dialog-confirm/dialog-confirm.component";
import { DialogProjectUpdateDocComponent } from 'src/app/shared/dialogs/dialog-project-update-doc/dialog-project-update-doc.component';

@Component({
  selector: 'vs-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss']
})
export class ProjectTableComponent implements OnInit, OnDestroy {
  @Input() projectId: number = 0;
  subscription: Subscription = new Subscription();

  projects: Project[] = [];
  displayedColumns: string[] = ['code', 'name', 'description', 'expirationDate', 'status', 'actions'];
  resultsLength = 0;
  pageSize = 30;
  pageIndex = 0;
  isLoadingResults = true;
  dataSource: MatTableDataSource<Project> = new MatTableDataSource<Project>([]);

  cProjectStatus = CProjectStatus;
  roleSelected: Role = new Role();
  filterStatusSelected: EProjectStatus = EProjectStatus.ALL;
  cRole = CRole;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store: Store<AppStateProjectFeature>,
    private router: Router,
    private dialog: MatDialog,
    private projectService: ProjectService,
    private matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getRoleSelectedState();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleDelete(projectId: number): void {
    const dataDialog: IDialogConfirm = {
      action: 'Archivar proyecto',
      title: 'Archivar proyecto',
      description: 'Desea archivar este proyecto?',
      accept: false
    }

    const dialogRef = this.matDialog.open(DialogConfirmComponent, {
      width: '400px',
      data: dataDialog,
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((resp) => resp && this.updateArchived(projectId))
    )
  }

  updateArchived(projectId: number): void {
    this.projectService.updateArchived(projectId)
      .subscribe(() => this.getProjects(30, 0));
  }

  handleBtnEdit(project: Project) {
    this.router.navigateByUrl(`backoffice/project/${project.id}`);
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
    this.router.navigateByUrl(`backoffice/project/${projectId}`).then();
  }

  getProjects(take: number, skip: number): void {
    this.isLoadingResults = true;
    this.projectService.getProjects(this.roleSelected.id, {status: this.filterStatusSelected, take, skip})
      .pipe(finalize(() => this.isLoadingResults = false))
      .subscribe((resp) => {
        this.dataSource.data = resp.data
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
