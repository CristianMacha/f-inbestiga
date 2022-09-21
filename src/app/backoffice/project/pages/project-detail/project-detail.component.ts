import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from "@angular/material/dialog";

import { Invoice, Project, Role } from '@core/models';
import { CProjectStatus, CRole } from "@core/enums";
import { IDialogConfirm } from "@core/interfaces";
import { AppStateProjectFeature } from '../../store/project.reducers';
import { loadProject, updateProjectActive } from '../../store/project.actions';
import { projectFeatureActiveFormR } from '../../store/project.selectors';
import { uiRoleSelected } from "../../../../shared/ui.selectors";
import { InvoiceService, ProjectService, SnackBarService } from "@core/services";
import { DialogAcceptProjectComponent } from "../../../../shared/dialogs/dialog-accept-project/dialog-accept-project.component";
import { DialogConfirmComponent } from "../../../../shared/dialogs/dialog-confirm/dialog-confirm.component";
import { DialogProjectUpdateDocComponent } from '../../../../../app/shared/dialogs/dialog-project-update-doc/dialog-project-update-doc.component';

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
    this.getActiveFormState();
    this.activatedRoute.params.subscribe((resp) => {
      this.projectId = parseInt(resp['id']);
      this.getProject(this.projectId);
      this.getInvoices(this.projectId);
    });
    this.getRoleSelectedState();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleAccept(): void {
    const dialogRef = this.matDialog.open(DialogAcceptProjectComponent, {
      width: '600px',
      data: { projectId: this.projectId },
      autoFocus: false,
      disableClose: true,
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((resp) => {
        if (resp) {
          this.getProject(this.projectId);
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

    const dialogRef = this.matDialog.open(DialogConfirmComponent, { width: '300px', data, autoFocus: false });
    this.subscription.add(
      dialogRef.afterClosed().subscribe((resp) => resp && this.refuseProject())
    );

  }

  refuseProject(): void {
    this.projectService.refuse(this.projectId)
      .subscribe({
        next: (resp) => {
          this.store.dispatch(loadProject({ projectId: resp.id }))
          this.snackBar.openTopEnd('Proyecto rechazdo');
        },
        error: (e) => this.snackBar.openTopEnd('Algo salio mal.')
      })
  }

  getProject(projectId: number): void {
    this.projectService.getProject(projectId, false)
      .subscribe({
        next: (resp) => {
          !resp.id && this.router.navigateByUrl('backoffice/project');
          this.project = resp;
        },
        error: () => this.router.navigateByUrl('backoffice/project')
      });
  }

  handleUploadUpdate() {
    const dialogRef = this.matDialog.open(DialogProjectUpdateDocComponent, {
      width: '300px',
      data: { projectId: this.projectId },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((resp) => resp && this.getProject(this.projectId));

    //this.store.dispatch(activeFormR({active: true}));
  }

  handleBtnToggleActiveProject() {
    this.store.dispatch(updateProjectActive({ projectId: this.projectId }));
  }

  handleBtnArrowBack() {
    this.router.navigateByUrl('backoffice/project');
  }

  dispatchProjects(): void {
    this.subscription.add(
      this.activatedRoute.params.subscribe((resp) => {
        this.projectId = parseInt(resp['id']);
        this.getInvoices(this.projectId);
        this.store.dispatch(loadProject({ projectId: this.projectId }));
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
