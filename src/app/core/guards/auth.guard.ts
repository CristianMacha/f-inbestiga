import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { appState } from '../../app.reducers';
import { uiFeature, uiFeatureIsAuthenticate, uiFeatureIsLoading } from '../../shared/ui.selectors';
import { AuthService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private store: Store<appState>,
    private router: Router,
    private authService: AuthService,
  ) { }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuthenticated = this.authService.refreshToken()
      .pipe(
        tap((resp) => {
          localStorage.setItem('token', resp.token);
          return true;
        }),
        map((resp) => resp.token ? true : false),
        catchError((error) => of(false))
      )

    return isAuthenticated;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isAuthenticated = this.store.select(uiFeature)
      .pipe(
        map((resp) => {
          if (resp.isAuthenticate && !resp.isLoading) {
            return true
          } else {
            this.router.navigateByUrl('auth/login');
            return false;
          }
        }),
      )

    return isAuthenticated;
  }

}
