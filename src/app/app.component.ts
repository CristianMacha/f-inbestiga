import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Router} from "@angular/router";

import {Subscription} from 'rxjs';
import {appState} from './app.reducers';
import {refreshToken} from './shared/ui.actions';
import {uiFeatureIsAuthenticate, uiFeatureIsLoading} from './shared/ui.selectors';

@Component({
  selector: 'vs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend-inbestiga';
  isLoading: boolean = false;

  subscription: Subscription = new Subscription();

  constructor(
    private store: Store<appState>
  ) {
  }

  ngOnInit() {
    this.subscription.add(
      this.store.select(uiFeatureIsLoading).subscribe(resp => this.isLoading = resp)
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
