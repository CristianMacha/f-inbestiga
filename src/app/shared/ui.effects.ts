import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { AuthService } from "@core/services";
import { loginError, refreshToken, setUser } from "./ui.actions";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class UiEffects {

    refreshToken$ = createEffect(
        () => this.actions$.pipe(
            ofType(refreshToken),
            mergeMap(
                () => this.authService.refreshToken()
                    .pipe(
                        map(resp => {
                            localStorage.setItem('token', resp.token);
                            return setUser({ user: resp.userDb });
                        }),
                        catchError(err => of(loginError({ payload: err })))
                    )
            )
        )
    )

    constructor(
        private actions$: Actions,
        private authService: AuthService,
    ) { }
}