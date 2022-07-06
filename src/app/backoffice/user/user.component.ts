import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { activeForm, loadPersons } from './store/user.actions';
import { AppStateUserFeature } from './store/user.reducer';
import { userFeature, userFeatureActiveForm, userFeatureDetails } from './store/user.selectors';

@Component({
  selector: 'vs-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  activeForm: boolean = false;
  showDetails: boolean = false;
  personSelected: boolean = false;

  activeForm$: Observable<boolean> = new Observable();
  showDetails$: Observable<boolean> = new Observable();

  constructor(
    private store: Store<AppStateUserFeature>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadPersons());
    this.getUserState();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  handleBtnNewPerson(): void {
    this.store.dispatch(activeForm({ active: true }));
  }

  getUserState() {
    this.subscription.add(
      this.store.select(userFeature).subscribe(
        (resp) => {
          this.activeForm = resp.activeForm;
          this.showDetails = resp.details;
          this.personSelected = resp.personSelected;
        }
      )
    )
  }

}
