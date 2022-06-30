import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { appState } from '../app.reducers';
import { LoadScriptService } from '../core/services/load-script.service';
import { unsetUser } from '../shared/ui.actions';

@Component({
  selector: 'vs-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackofficeComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  constructor(
    private store: Store<appState>,
    private loadScriptService: LoadScriptService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadScriptService.loadScript('perfectScrollbar', 'assets/js/plugins/perfect-scrollbar.min.js')
      .then(() => console.log('load perfectScrollbar'))
      .catch((error) => console.error(error));
    this.loadScriptService.loadScript('materialDashboard', 'assets/js/material-dashboard.js')
      .then(() => console.log('load materialDashboard'))
      .catch((error) => console.error(error));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  logout() {
    // this.loadScriptService.removeScript('perfectScrollbar');
    // this.loadScriptService.removeScript('materialDashboard');
    this.store.dispatch(unsetUser());
    localStorage.clear();
    this.router.navigateByUrl('auth/login');
  }

}
