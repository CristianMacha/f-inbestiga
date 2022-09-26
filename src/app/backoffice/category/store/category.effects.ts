import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { CategoryService } from '@core/services';
import {
  createCategory,
  loadError,
  loadCategories,
  loadCategoriesSuccess,
  setCategory,
  updateCategory,
} from './category.actions';

@Injectable()
export class CategoryEffects {
  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCategories),
      mergeMap((resp) =>
        this.categoryService.getCategories().pipe(
          map((resp) => loadCategoriesSuccess({ categories: resp })),
          catchError((err) => of(loadError({ payload: err })))
        )
      )
    )
  );

  createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCategory),
      mergeMap((resp) =>
        this.categoryService.create(resp.category).pipe(
          map((resp) => setCategory({ category: resp })),
          catchError((err) => of(loadError({ payload: err })))
        )
      )
    )
  );

  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCategory),
      mergeMap((resp) =>
        this.categoryService.update(resp.category).pipe(
          map((resp) => setCategory({ category: resp })),
          catchError((err) => of(loadError({ payload: err })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private categoryService: CategoryService
  ) {}
}
