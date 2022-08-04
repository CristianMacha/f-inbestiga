import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {Store} from '@ngrx/store';
import {catchError, map, Observable, of, tap} from 'rxjs';

import {appState} from '../../app.reducers';
import {uiFeature, uiFeatureIsAuthenticate, uiFeatureIsLoading} from '../../shared/ui.selectors';
import {AuthService} from '@core/services';
import {loadPersonRoles, login, refreshToken, setUser} from "../../shared/ui.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private store: Store<appState>,
    private router: Router,
    private authService: AuthService,
  ) {
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuthenticated = this.authService.refreshToken()
      .pipe(
        map((resp) => {
          this.router.navigateByUrl('auth/login');
          return resp
        }),
        catchError((error) => of(false))
      )

    return isAuthenticated;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isAuthenticated = this.authService.refreshToken()
      .pipe(
        map((resp) => {
          this.router.navigateByUrl('auth/login');
          return resp;
        }),
        catchError((error) => of(false))
      )

    return isAuthenticated;
  }

}
