import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {catchError, map, Observable, of} from 'rxjs';

import {appState} from "../../app.reducers";
import {Store} from "@ngrx/store";
import {uiResources} from "../../shared/ui.selectors";

@Injectable({
  providedIn: 'root'
})
export class ResourceGuard implements CanActivate {
  constructor(
    private store: Store<appState>,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const stateUrl = state.url;
    const urlActive = stateUrl.split('/')[2];
    const hasPermission = this.store.select(uiResources).pipe(
      map((resources) => resources.some(resource => resource.url == urlActive)),
      catchError(() => of(false))
    );

    return hasPermission
  }
}
