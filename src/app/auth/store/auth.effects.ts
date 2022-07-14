import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { Router } from "@angular/router";

import { AuthService } from "@core/services";
import { login, setUser, loginError } from "../../shared/ui.actions";

@Injectable()
export class AuthEffects {

    login$ = createEffect(
        () => this.actions$.pipe(
            ofType(login),
            mergeMap(
                (resp) => this.authService.login(resp.login)
                    .pipe(
                        map(resp => {
                            localStorage.setItem('token', resp.token);
                            this.router.navigateByUrl('backoffice/dashboard');
                            return setUser({ user: resp.userDb});
                        }),
                        catchError(err => of(loginError({ payload: err })))
                    )
            )
        )
    )

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
    ) { }
}
