import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadScriptService } from '@core/services';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { uiFeatureIsAuthenticate, uiFeatureIsLoading } from 'src/app/shared/ui.selectors';

import { login } from '../../shared/ui.actions';
import { AppStateAuthFeature } from '../store/auth.reducer';

@Component({
  selector: 'vs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required)
  });

  subscription: Subscription = new Subscription();
  isLoading$: Observable<boolean> = new Observable();

  constructor(
    private readonly store: Store<AppStateAuthFeature>,
    private router: Router,
    private loadScriptService: LoadScriptService,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(uiFeatureIsLoading);
    this.verifyAuth();
    // this.loadScriptService.loadScript('popperJs', '../../../assets/js/core/popper.min.js')
    //   .then(() => console.log('load'))
    //   .catch((error) => console.error(error))
    // this.loadScriptService.loadScript('bootstrap', '../../../assets/js/core/bootstrap.min.js')
    //   .then(() => console.log('load'))
    //   .catch((error) => console.error(error))
    this.loadScriptService.loadScript('perfectScrollbar', '../../../assets/js/plugins/perfect-scrollbar.min.js')
      .then(() => console.log('load'))
      .catch((error) => console.error(error))
    // this.loadScriptService.loadScript('smoothScrollbar', '../../../assets/js/plugins/smooth-scrollbar.min.js')
    //   .then(() => console.log('load'))
    //   .catch((error) => console.error(error))
      this.loadScriptService.loadScript('materialDashboard', '../../../assets/js/material-dashboard.js')
        .then(() => console.log('load'))
        .catch((error) => console.error(error))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  login(): void {
    this.store.dispatch(login({ login: this.loginForm.value }));
  }

  verifyAuth(): void {
    this.subscription.add(
      this.store.select(uiFeatureIsAuthenticate).subscribe(isAuth => isAuth && this.router.navigateByUrl('backoffice'))
    )
  }


  //TODO: USAR CANLOAD AUTHGAURD - udemy
}
