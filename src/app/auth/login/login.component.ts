import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';

import {uiFeatureIsLoading} from '../../../app/shared/ui.selectors';
import {loadRoleSelected} from '../../shared/ui.actions';
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
    password: new FormControl('', Validators.required)
  });

  subscription: Subscription = new Subscription();
  isLoading$: Observable<boolean> = new Observable();

  constructor(
    private readonly store: Store<AppStateAuthFeature>,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
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
      .subscribe((resp) => {
        console.log(resp);
        if (resp.personRoles && resp.personRoles.length > 0) {
          this.openDialogRoles(resp)
        }
      });
  }

  openDialogRoles(respLogin: ILoginResponse): void {
    const dialogRef = this.dialog.open(DialogRolesComponent, {
      width: '300px',
      data: {personRoles: respLogin.personRoles},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        localStorage.setItem('rId', resp.role.id);
        this.store.dispatch(loadRoleSelected({roleId: resp.id}))
        this.refreshTokenAndRedirect();
      }
    })
  }

  refreshTokenAndRedirect(): void {
    this.authService.refreshToken()
      .subscribe((resp) => resp && this.router.navigateByUrl('backoffice/dashboard'))
  }

}
