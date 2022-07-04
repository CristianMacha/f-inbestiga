import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

declare function toggleSidenav(): any;

import { appState } from '../app.reducers';
import { User } from '@core/models';
import { unsetUser } from '../shared/ui.actions';
import { uiFeatureUser } from '../shared/ui.selectors';

@Component({
  selector: 'vs-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackofficeComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  user$: Observable<User> = new Observable();

  btnCloseSidenav: boolean = false;
  constructor(
    private store: Store<appState>,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.select(uiFeatureUser);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  logout() {
    this.store.dispatch(unsetUser());
    localStorage.clear();
    this.router.navigateByUrl('auth/login');
  }

  toggleSidenav(active: boolean) {
    toggleSidenav();
    this.btnCloseSidenav = active;
  }

}
