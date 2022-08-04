import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';

import {uiFeatureIsLoading} from '../../../app/shared/ui.selectors';
import {loadResources, login, setUser} from '../../shared/ui.actions';
import {AppStateAuthFeature} from '../store/auth.reducer';
import {AuthService} from "@core/services";
import {Router} from "@angular/router";
import {UserModule} from "../../backoffice/user/user.module";

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
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(uiFeatureIsLoading);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  login(): void {
    this.authService.login(this.loginForm.value)
      .subscribe((resp) => resp && this.router.navigateByUrl('backoffice/dashboard'));
  }

}
