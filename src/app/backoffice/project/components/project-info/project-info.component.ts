import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

import {Person, Project, Role} from '@core/models';
import {CProjectStatus, CRole} from "@core/enums";
import {IDialogConfirm} from "@core/interfaces";
import {ProjectService} from '@core/services';
import {AppStateProjectFeature} from '../../store/project.reducers';
import {projectFeatureProject} from '../../store/project.selectors';
import {loadProject} from '../../store/project.actions';
import {uiRoleSelected} from "../../../../shared/ui.selectors";
import {DialogConfirmComponent} from "../../../../shared/dialogs/dialog-confirm/dialog-confirm.component";

@Component({
  selector: 'vs-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss'],
})
export class ProjectInfoComponent implements OnInit, OnDestroy {
  @Input() projectId: number = 0;
  subscription: Subscription = new Subscription();

  progressControl: FormControl = new FormControl('', Validators.required);

  project: Project = new Project();
  students: Person[] = [];
  advisors: Person[] = [];
  cProjectStatus = CProjectStatus;
  roleSelected: Role = new Role();
  cRole = CRole;

  constructor(
    private store: Store<AppStateProjectFeature>,
    private projectService: ProjectService,
    private matDialog: MatDialog,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getProject();
    this.getRoleSelected();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getRoleSelected(): void {
    this.subscription.add(
      this.store.select(uiRoleSelected).subscribe((role) => {
        (role.id == this.cRole.STUDENT) && this.progressControl.disable();
        this.roleSelected = role;
      })
    )
  }

  handleUpdateProgress(): void {
    (this.progressControl.value == 100) ? this.openDialogConfirm() : this.updateProgressProject();
  }

  openDialogConfirm(): void {
    const dataDialog: IDialogConfirm = {
      accept: true,
      action: 'Completar proyecto',
      description: 'Desea marcar como completado este proyecto?',
      title: 'Marcar como completado.',
    }

    const dialogRef = this.matDialog.open(DialogConfirmComponent, {
      width: '400px',
      data: dataDialog,
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((resp) => resp ? this.updateProgressProject() : this.progressControl.reset(this.project.progress))
    );
  }

  updateProgressProject(): void {
    this.projectService
      .updateProgress(this.project.id, this.progressControl.value)
      .subscribe((resp) => {
        this.students = [];
        this.advisors = [];
        this.progressControl.reset(resp.progress);
        this.store.dispatch(loadProject({projectId: resp.id}));
      });
  }

  getProject(): void {
    this.projectService.getProject(this.projectId, false)
      .subscribe((resp) => {
        this.project = resp;
        this.progressControl.patchValue(resp.progress);
        this.project.personProjects.forEach((pp) => {
          pp.isAdvisor ? this.advisors.push(pp.person) : this.students.push(pp.person);
        });
      })
  }

  handleDeleteProject(): void {
    const dataDialog: IDialogConfirm = {
      accept: false,
      title: 'Eliminar Proyecto',
      description: 'Desea eliminar este proyecto permanentemente?',
      action: 'Eliminar proyecto',
    };
    const dialogRef = this.matDialog.open(DialogConfirmComponent, {
      width: '400px',
      data: dataDialog
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((resp) => resp && this.deleteProject())
    );
  }

  deleteProject(): void {
    this.projectService.updateDeleted(this.project.id)
      .subscribe((resp) => this.router.navigateByUrl('backoffice/project'))
  }
}
