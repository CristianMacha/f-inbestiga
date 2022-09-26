import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import { finalize, Subscription} from 'rxjs';

import {loadRoleSelected, logout} from '../../shared/ui.actions';
import {AppStateAuthFeature} from '../store/auth.reducer';
import {AuthService} from "@core/services";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogRolesComponent} from "../../shared/dialogs/dialog-roles/dialog-roles.component";
import {ILoginResponse} from "@core/interfaces";

@Component({
  selector: 'vs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  year = new Date().getFullYear();
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(false)
  });

  subscription: Subscription = new Subscription();
  loading = false;

  constructor(
    private readonly store: Store<AppStateAuthFeature>,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.verifyEmailLocalStorage();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  login(): void {
    this.loading=true;
    this.authService.login(this.loginForm.value)
    .pipe(finalize(() => this.loading = false))
    .subscribe((resp) => {
      this.checkRememberMe();
      localStorage.setItem('token', resp.token);
      if (resp.personRoles && resp.personRoles.length > 1) {
        this.openDialogRoles(resp);
      }

      if (resp.personRoles && resp.personRoles.length == 1) {
        localStorage.setItem('rId', resp.personRoles[0].role.id.toString());
        this.store.dispatch(loadRoleSelected({roleId: resp.personRoles[0].role.id}))
        this.refreshTokenAndRedirect();
      }
    });
  }

  checkRememberMe(): void {
      const email = this.loginForm.controls['email'].value;
      const rememberIsMark = this.loginForm.controls['rememberMe'].value;
      if(rememberIsMark) {
        this.setEmailLocalStorage(email);
      } else {
        this.removeEmailLocalStorage();
      }
  }

  verifyEmailLocalStorage(): void {
    const emailTemp = localStorage.getItem('email');
    if(emailTemp) {
      this.loginForm.controls['email'].patchValue(emailTemp);
      this.loginForm.controls['rememberMe'].patchValue(true);
    }
  }

  setEmailLocalStorage(email: string): void {
    localStorage.setItem('email', email);
  }

  removeEmailLocalStorage(): void {
    localStorage.removeItem('email');
  }

  openDialogRoles(respLogin: ILoginResponse): void {
    const dialogRef = this.dialog.open(DialogRolesComponent, {
      width: '300px',
      data: {personRoles: respLogin.personRoles},
      disableClose: true
    });
    this.loading=false;
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        localStorage.setItem('rId', resp.role.id);
        this.store.dispatch(loadRoleSelected({roleId: resp.id}))
        this.refreshTokenAndRedirect();
      } else {
        this.store.dispatch(logout());
      }
      this.loading=false;
    })
  }

  refreshTokenAndRedirect(): void {
    this.loading=true;
    this.authService.refreshToken()
    .pipe(finalize(()=>this.loading=false))
    .subscribe((resp) => resp && this.router.navigateByUrl('backoffice/dashboard'))
  }
}
