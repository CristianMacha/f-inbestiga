import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {finalize, Subscription} from 'rxjs';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";

import {Person} from '@core/models';
import {AppStateUserFeature} from '../../store/user.reducer';
import {activeDetails, activeFormUpdate} from '../../store/user.actions';
import {CRole} from "@core/enums";
import {PersonService, UserService} from "@core/services";
import {DialogConfirmComponent} from "../../../../shared/dialogs/dialog-confirm/dialog-confirm.component";
import {IDialogConfirm} from "@core/interfaces";

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

  handleBtnEdit(person: Person) {
    this.store.dispatch(activeFormUpdate({person}));
  }

  handleBtnView(person: Person): void {
    this.store.dispatch(activeDetails({person}));
  }

  paginatorEvent(event: PageEvent): void {
    this.getPersons(event.pageSize, event.pageIndex);
  }

  handleDelete(userId: number): void {
    const dataDialog: IDialogConfirm = {
      accept: false,
      action: 'Eliminar usuario',
      title: 'Eliminar usuario',
      description: 'Desea eliminar este usuario?'
    }
    const dialogRef = this.matDialog.open(DialogConfirmComponent, {
      width: '400px',
      data: dataDialog,
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((resp) => resp && this.updateActiveUser(userId))
    );
  }

  updateActiveUser(userId: number): void {
    this.userService.updateActive(userId)
      .subscribe((resp) => this.getPersons(30, 0));
  }

}
