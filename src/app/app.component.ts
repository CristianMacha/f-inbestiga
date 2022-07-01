import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { appState } from './app.reducers';
import { loading, refreshToken, stopLoading } from './shared/ui.actions';
import { uiFeatureIsAuthenticate, uiFeatureIsLoading } from './shared/ui.selectors';

@Component({
  selector: 'vs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend-inbestiga';

  subscription: Subscription = new Subscription();
  isLoading$: Observable<boolean> = new Observable();

  constructor(
    private store: Store<appState>,
    private router: Router,
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(uiFeatureIsLoading);
    // this.store.select(uiFeatureIsAuthenticate).subscribe(isAuth => {
    //   isAuth && this.store.dispatch(stopLoading())
    //   isAuth && this.router.navigateByUrl('/backoffice');
    // })
    this.refreshToken();
  }

  refreshToken(): void {
    this.store.dispatch(refreshToken());
  }

}
