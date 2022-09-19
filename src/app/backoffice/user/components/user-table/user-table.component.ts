import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {finalize, Subscription} from 'rxjs';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";

import {Person, User} from '@core/models';
import {AppStateUserFeature} from '../../store/user.reducer';
import {activeDetails, activeFormUpdate} from '../../store/user.actions';
import {CRole} from "@core/enums";
import {PersonService, UserService} from "@core/services";
import {DialogConfirmComponent} from "../../../../shared/dialogs/dialog-confirm/dialog-confirm.component";
import {IDialogConfirm} from "@core/interfaces";
import { Router } from '@angular/router';

@Component({
  selector: 'vs-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  subscription: Subscription = new Subscription();
  idRole = CRole;

  persons: Person[] = [];
  displayedColumns: string[] = ['fullname', 'surnames', 'code', 'phone', 'email', 'roles', 'actions'];
  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store: Store<AppStateUserFeature>,
    private personService: PersonService,
    private matDialog: MatDialog,
    private userService: UserService,
    private router: Router,

  ) {
  }

  ngOnInit(): void {
    this.getPersons(30, 0);
  }

  getPersons(take: number, skip: number): void {
    this.isLoadingResults = true;
    this.personService.getPersons({roleId: 0, take, skip})
      .pipe(finalize(() => this.isLoadingResults = false))
      .subscribe((resp) => {
        this.persons = resp.data;
        this.resultsLength = resp.total;
      });
  }

  handleBtnEdit(personId: Person) {
    this.router.navigateByUrl(`backoffice/user/${personId}`).then();
  }

  handleBtnView(person: Person): void {
    this.router.navigateByUrl(`backoffice/user/detalle/${person.user.id}`).then();
  }

  paginatorEvent(event: PageEvent): void {
    this.getPersons(event.pageSize, event.pageIndex);
  }

  handleActive(user: User): void {
    const userActive = user.active;
    const dataDialog: IDialogConfirm = {
      accept: userActive ? false : true,
      action: `${userActive ? 'Desactivar' : 'Activar'} Usuario`,
      title: `${userActive ? 'Desactivar' : 'Activar'} Usuario`,
      description: `Desea ${userActive ? 'desactivar' : 'activar'} este usuario?`
    }
    const dialogRef = this.matDialog.open(DialogConfirmComponent, {
      width: '400px',
      data: dataDialog,
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((resp) => resp && this.updateActiveUser(user.id))
    );
  }

  updateActiveUser(userId: number): void {
    this.userService.updateActive(userId)
      .subscribe((resp) => this.getPersons(30, 0));
  }

}
