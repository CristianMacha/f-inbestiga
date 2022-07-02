import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Person } from '@core/models';
import { AppStateUserFeature } from '../../store/user.reducer';
import { userFeaturePersons } from '../../store/user.selectors';
import { activeFormUpdate } from '../../store/user.actions';

@Component({
  selector: 'vs-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  persons$: Observable<Person[]> = new Observable();

  constructor(
    private store: Store<AppStateUserFeature>,
  ) { }

  ngOnInit(): void {
    this.persons$ = this.store.select(userFeaturePersons);
  }

  handleBtnEdit(person: Person) {
    this.store.dispatch(activeFormUpdate({ person }));
  }

}
