import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, of} from 'rxjs';

import {ProjectService, RequirementService} from '@core/services';
import {
  createProject,
  loadProject,
  loadProjects, loadProjectsFilter,
  loadProjectsSuccess,
  loadRequirements,
  requirementLoadedSuccess,
  setError,
  setProject,
  updateProject,
  updateProjectActive,
} from './project.actions';

@Injectable()
export class ProjectEffects {
  getProjects$ = createEffect(() => this.actions$.pipe(
    ofType(loadProjects),
    mergeMap((resp) =>
      this.projectService.getProjects(resp.roleId).pipe(
        map((resp) => loadProjectsSuccess({projects: resp.data})),
        catchError((err) => of(setError({payload: err})))
      )
    )
  ));

  getProjectsFiltered$ = createEffect(() => this.actions$.pipe(
    ofType(loadProjectsFilter),
    mergeMap((resp) => this.projectService.getProjects(resp.roleId, resp.filter)
      .pipe(
        map((resp) => loadProjectsSuccess({projects: resp.data})),
        catchError((err) => of(setError({payload: err})))
      ))
  ));

  getProject$ = createEffect(() => this.actions$.pipe(
    ofType(loadProject),
    mergeMap((resp) =>
      this.projectService.getProject(resp.projectId).pipe(
        map((resp) => setProject({project: resp})),
        catchError((err) => of(setError({payload: err})))
      )
    )
  ));

  createProject$ = createEffect(() => this.actions$.pipe(
    ofType(createProject),
    mergeMap((resp) =>
      this.projectService.create(resp.project).pipe(
        map((resp) => setProject({project: resp})),
        catchError((err) => of(setError({payload: err})))
      )
    )
  ));

  updateProject$ = createEffect(() => this.actions$.pipe(
    ofType(updateProject),
    mergeMap((resp) =>
      this.projectService.update(resp.project).pipe(
        map((resp) => setProject({project: resp})),
        catchError((err) => of(setError({payload: err})))
      )
    )
  ));

  updateProjectActive$ = createEffect(() => this.actions$.pipe(
    ofType(updateProjectActive),
    mergeMap((resp) =>
      this.projectService.updateActive(resp.projectId).pipe(
        map((resp) => setProject({project: resp})),
        catchError((err) => of(setError({payload: err})))
      )
    )
  ));

  getRequirements$ = createEffect(() => this.actions$.pipe(
    ofType(loadRequirements),
    mergeMap((resp) =>
      this.requirementService.getByProject(resp.projectId).pipe(
        map((resp) => requirementLoadedSuccess({requirements: resp})),
        catchError((err) => of(setError({payload: err})))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
    private requirementService: RequirementService
  ) {
  }
}
