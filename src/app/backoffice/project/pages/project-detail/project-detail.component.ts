import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {MatDialog} from "@angular/material/dialog";

import {Invoice, Project, Role} from '@core/models';
import {AppStateProjectFeature} from '../../store/project.reducers';
import {activeFormR, loadProject, updateProjectActive} from '../../store/project.actions';
import {projectFeatureActiveFormR, projectFeatureProject} from '../../store/project.selectors';
import {CProjectStatus, CRole} from "@core/enums";
import {uiRoleSelected} from "../../../../shared/ui.selectors";
import {InvoiceService, ProjectService, SnackBarService} from "@core/services";
import {
  DialogAcceptProjectComponent
} from "../../../../shared/dialogs/dialog-accept-project/dialog-accept-project.component";
import {DialogConfirmComponent} from "../../../../shared/dialogs/dialog-confirm/dialog-confirm.component";
import {IDialogConfirm} from "@core/interfaces";

@Component({
  selector: 'vs-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  projectId: number = 0;
  project: Project = new Project();
  cProjectStatus = CProjectStatus;

  invoices: Invoice[] = [];
  activeFormR: boolean = false;
  roleSelected: Role = new Role();
  cRole = CRole;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppStateProjectFeature>,
    private router: Router,
    private invoiceService: InvoiceService,
    private matDialog: MatDialog,
    private projectService: ProjectService,
    private snackBar: SnackBarService
  ) {
  }

  ngOnInit(): void {
    this.dispatchProjects();
    this.getActiveFormState();
    this.getProject();
    this.getRoleSelectedState();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleAccept(): void {
    const dialogRef = this.matDialog.open(DialogAcceptProjectComponent, {
      width: '400px',
      data: {projectId: this.projectId}
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((resp) => {
        if (resp) {
          this.store.dispatch(loadProject({projectId: this.projectId}))
          this.getInvoices(this.projectId);
        }
      })
    );
  }

  handleRefuse(): void {
    const data: IDialogConfirm = {
      title: 'Rechazar',
      description: 'Esta seguro de rachazar este proyecto?',
      action: 'Rechazar',
      accept: false
    };

    const dialogRef = this.matDialog.open(DialogConfirmComponent, {width: '300px', data, autoFocus: false});
    this.subscription.add(
      dialogRef.afterClosed().subscribe((resp) => resp && this.refuseProject())
    );
  }

  refuseProject(): void {
    this.projectService.refuse(this.projectId)
      .subscribe({
        next: (resp) => {
          this.store.dispatch(loadProject({projectId: resp.id}))
          this.snackBar.openTopEnd('Proyecto rechazdo');
        },
        error: (e) => this.snackBar.openTopEnd('Algo salio mal.')
      })
  }

  getProject(): void {
    this.subscription.add(
      this.store
        .select(projectFeatureProject)
        .subscribe((resp) => (this.project = resp))
    );
  }

  handleUploadUpdate() {
    this.store.dispatch(activeFormR({active: true}));
  }

  handleBtnToggleActiveProject() {
    this.store.dispatch(updateProjectActive({projectId: this.projectId}));
  }

  handleBtnArrowBack() {
    this.router.navigateByUrl('backoffice/project');
  }

  dispatchProjects(): void {
    this.subscription.add(
      this.activatedRoute.params.subscribe((resp) => {
        this.projectId = parseInt(resp['id']);
        this.getInvoices(this.projectId);
        this.store.dispatch(loadProject({projectId: this.projectId}));
      })
    );
  }

  getRoleSelectedState(): void {
    this.subscription.add(
      this.store.select(uiRoleSelected).subscribe((resp) => this.roleSelected = resp),
    )
  }

  getActiveFormState(): void {
    this.subscription.add(
      this.store
        .select(projectFeatureActiveFormR)
        .subscribe((resp) => (this.activeFormR = resp))
    );
  }

  getInvoices(projectId: number): void {
    this.invoiceService.getByProject(projectId)
      .subscribe((resp) => this.invoices = resp);
  }
}
