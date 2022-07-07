import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { ProjectService } from '@core/services';
import {
  createProject,
  loadProject,
  loadProjects,
  loadProjectsSuccess,
  setError,
  setProject,
  updateProject,
} from './project.actions';

@Injectable()
export class ProjectEffects {
  getProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProjects),
      mergeMap((resp) =>
        this.projectService.getProjects().pipe(
          map((resp) => loadProjectsSuccess({ projects: resp })),
          catchError((err) => of(setError({ payload: err })))
        )
      )
    )
  );

  getProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProject),
      mergeMap((resp) =>
        this.projectService.getProject(resp.projectId).pipe(
          map((resp) => setProject({ project: resp })),
          catchError((err) => of(setError({ payload: err })))
        )
      )
    )
  );

  createProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProject),
      mergeMap((resp) =>
        this.projectService.create(resp.project).pipe(
          map((resp) => setProject({ project: resp })),
          catchError((err) => of(setError({ payload: err })))
        )
      )
    )
  );

  updatePersonn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProject),
      mergeMap((resp) =>
        this.projectService.update(resp.project).pipe(
          map((resp) => setProject({ project: resp })),
          catchError((err) => of(setError({ payload: err })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private projectService: ProjectService
  ) {}
}
