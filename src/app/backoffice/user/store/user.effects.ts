import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";

import { PersonService } from "@core/services";
import { createPerson, loadError, loadPersons, loadPersonsSuccess, setPerson, updatePerson } from "./user.actions";

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

  createPerson$ = createEffect(
    () => this.actions$.pipe(
      ofType(createPerson),
      mergeMap(
        (resp) => this.personService.create(resp.person)
          .pipe(
            map((resp) => setPerson({ person: resp })),
            catchError(err => of(loadError({ payload: err })))
          )
      )
    )
  )

  updatePerson$ = createEffect(
    () => this.actions$.pipe(
      ofType(updatePerson),
      mergeMap(
        (resp) => this.personService.update(resp.person)
        .pipe(
          map((resp) => setPerson({ person: resp })),
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