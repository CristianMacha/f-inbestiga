import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Person } from '@core/models';
import { AppStateUserFeature } from '../../store/user.reducer';
import { userFeaturePersons } from '../../store/user.selectors';
import { activeDetails, activeFormUpdate, loadPersons } from '../../store/user.actions';
import { CRole } from "@core/enums";

@Component({
  selector: 'vs-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  persons$: Observable<Person[]> = new Observable();
  idRole = CRole;

  constructor(
    private store: Store<AppStateUserFeature>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadPersons());
    this.persons$ = this.store.select(userFeaturePersons);
  }

  handleBtnEdit(person: Person) {
    this.store.dispatch(activeFormUpdate({ person }));
  }

  handleBtnView(person: Person): void {
    this.store.dispatch(activeDetails({ person }));
  }

}
