import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {MatDialog} from "@angular/material/dialog";

import {Person, Project} from '@core/models';
import {IDialogConfirm} from "@core/interfaces";
import {ProjectService, UserService} from '@core/services';
import {AppStateUserFeature} from '../../store/user.reducer';
import {userFeaturePerson} from '../../store/user.selectors';
import {activeFormUpdate, closeDetails} from '../../store/user.actions';
import {DialogConfirmComponent} from "../../../../shared/dialogs/dialog-confirm/dialog-confirm.component";

@Component({
  selector: 'vs-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  person: Person = new Person();
  projects: Project[] = [];

  constructor(
    private store: Store<AppStateUserFeature>,
    private projectService: ProjectService,
    private matDialog: MatDialog,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.getPerson();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleBtnActive(userId: number): void {
    const userDeleted = this.person.user.deleted;
    const dataDialog: IDialogConfirm = {
      accept: userDeleted ? true : false,
      title: `${userDeleted ? 'Restaurar' : 'Eliminar'} Usuario`,
      description: `Desea ${userDeleted ? 'Restaurar' : 'Eliminar permanentemente'} este usuario?`,
      action: `${userDeleted ? 'Restaruar' : 'Eliminar'} usuario`,
    }
    const dialogRef = this.matDialog.open(DialogConfirmComponent, {
      width: '400px',
      data: dataDialog,
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((resp) => resp && this.updateDeleted(userId))
    );
  }

  updateDeleted(userId: number): void {
    this.userService.updateDeleted(userId)
      .subscribe(() => this.handleBtnBack())
  }

  getPerson(): void {
    this.subscription.add(
      this.store.select(userFeaturePerson)
        .subscribe(
          (resp) => {
            this.person = resp;
            this.getProjects(resp.id)
          },
        )
    )
  }

  getProjects(personId: number): void {
    this.projectService.getByPerson(personId)
      .subscribe(
        (resp) => this.projects = resp,
      )
  }

  handleBtnEditUser() {
    this.store.dispatch(activeFormUpdate({person: this.person}));
  }

  handleBtnBack() {
    this.store.dispatch(closeDetails());
  }

}
