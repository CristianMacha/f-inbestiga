import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';

import {appState} from './app.reducers';
import {refreshToken} from './shared/ui.actions';
import {uiFeatureIsLoading} from './shared/ui.selectors';

@Component({
  selector: 'vs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend-inbestiga';
  isLoading: boolean = false;

  subscription: Subscription = new Subscription();
  isLoading$: Observable<boolean> = new Observable();

  constructor(
    private store: Store<appState>,
  ) {
  }

  ngOnInit() {
    this.subscription.add(
      this.store.select(uiFeatureIsLoading).subscribe(resp => this.isLoading = resp)
    );
    this.refreshToken();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  refreshToken(): void {
    this.store.dispatch(refreshToken());
  }

}
