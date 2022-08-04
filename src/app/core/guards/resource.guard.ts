import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate, CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {catchError, map, Observable, of} from 'rxjs';

import {appState} from "../../app.reducers";
import {Store} from "@ngrx/store";
import {AuthService, ResourceService} from "@core/services";

@Injectable({
  providedIn: 'root'
})
export class ResourceGuard implements CanActivate, CanLoad {
  constructor(
    private store: Store<appState>,
    private router: Router,
    private resourceService: ResourceService,
    private authService: AuthService,
  ) {
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuthenticated = this.authService.refreshToken()
      .pipe(
        map((resp) => resp),
        catchError((error) => of(false))
      )

    return isAuthenticated;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const stateUrl = state.url;
    const urlActive = stateUrl.split('/')[2];

    const hasPermission = this.authService.resources.some((r) => r.url == urlActive);

    return hasPermission
  }
}
