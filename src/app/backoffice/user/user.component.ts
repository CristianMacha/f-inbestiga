import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { activateForm, loadPersons } from './store/user.actions';
import { AppStateUserFeature } from './store/user.reducer';
import { userFeatureActiveForm } from './store/user.selectors';

@Component({
  selector: 'vs-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  activeForm$: Observable<boolean> = new Observable();

  constructor(
    private store: Store<AppStateUserFeature>,
  ) { }

  ngOnInit(): void {
    this.activeForm$ = this.store.select(userFeatureActiveForm);
    this.store.dispatch(loadPersons());
  }

  handleBtnNewPerson(): void {
    this.store.dispatch(activateForm());
  }

}
