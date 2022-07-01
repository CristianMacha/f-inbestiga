import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadScriptService } from '@core/services';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { uiFeatureIsLoading } from '../../../app/shared/ui.selectors';
import { login } from '../../shared/ui.actions';
import { AppStateAuthFeature } from '../store/auth.reducer';

@Component({
  selector: 'vs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  year = new Date().getFullYear();
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required)
  });

  subscription: Subscription = new Subscription();
  isLoading$: Observable<boolean> = new Observable();

  constructor(
    private readonly store: Store<AppStateAuthFeature>,
    private loadScriptService: LoadScriptService,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(uiFeatureIsLoading);

    // this.loadScriptService.loadScript('perfectScrollbar', 'assets/js/plugins/perfect-scrollbar.min.js')
    //   .then(() => console.log('load perfectScrollbar'))
    //   .catch((error) => console.error(error));
    // this.loadScriptService.loadScript('materialDashboard', 'assets/js/material-dashboard.js')
    //   .then(() => console.log('load materialDashboard'))
    //   .catch((error) => console.error(error));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // this.loadScriptService.removeScript('perfectScrollbar');
    // this.loadScriptService.removeScript('materialDashboard');
  }

  login(): void {
    this.store.dispatch(login({ login: this.loginForm.value }));
  }

  //TODO: USAR CANLOAD AUTHGAURD - udemy
}
