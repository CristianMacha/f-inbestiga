import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {catchError, map, mergeMap, of} from "rxjs";

import {AuthService, PersonRoleService, PersonService} from "@core/services";
import {
  loadPerson,
  loadPersonRoles,
  loadRoleSelected,
  loginError, personLoadedSuccess,
  personRolesLoadedSuccess,
  refreshToken, roleSelectedLoadedSuccess,
  setUser,
  stopLoading
} from "./ui.actions";
import {RoleService} from "../core/services/role.service";

@Injectable()
export class UiEffects {

  refreshToken$ = createEffect(() => this.actions$.pipe(
    ofType(refreshToken),
    mergeMap(
      () => this.authService.refreshToken()
        .pipe(
          map(resp => {
            localStorage.setItem('token', resp.token);
            this.store.dispatch(stopLoading());
            return setUser({user: resp.userDb});
          }),
          catchError(err => {
            this.router.navigateByUrl('auth/login');
            return of(loginError({payload: err}))
          })
        )
    )
  ));

  getPersonRoles$ = createEffect(() => this.actions$.pipe(
    ofType(loadPersonRoles),
    mergeMap(() => this.personRolesService.getByPerson()
      .pipe(
        map((resp) => personRolesLoadedSuccess({personRoles: resp})),
        catchError((error) => of(loginError({payload: error})))
      ))
  ));

  getRoleSelected$ = createEffect(() => this.actions$.pipe(
    ofType(loadRoleSelected),
    mergeMap((resp) => this.roleService.getOne(resp.roleId)
      .pipe(
        map((resp) => roleSelectedLoadedSuccess({role: resp})),
        catchError((error) => of(loginError({payload: error})))
      ))
  ));

  getPersonByUser$ = createEffect(() => this.actions$.pipe(
    ofType(loadPerson),
    mergeMap((resp) => this.personService.getByUser(resp.userId)
      .pipe(
        map((resp) => personLoadedSuccess({person: resp})),
        catchError((error) => of(loginError(error)))
      ))
  ));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private personRolesService: PersonRoleService,
    private roleService: RoleService,
    private personService: PersonService,
    private store: Store,
    private router: Router,
  ) {
  }
}
