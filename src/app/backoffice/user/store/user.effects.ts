import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { PersonService } from "@core/services";
import { loadError, loadPersons, loadPersonsSuccess } from "./user.actions";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class UserEffects {

  getUsers$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadPersons),
      mergeMap(
        (resp) => this.personService.getPersons()
          .pipe(
            map((resp) => loadPersonsSuccess({ persons: resp })),
            catchError(err => of(loadError({ payload: err })))
          )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private personService: PersonService,
  ) { }
}