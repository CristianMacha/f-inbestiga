import { createAction, props } from "@ngrx/store";

import { Project } from "@core/models";

export const createProject  = createAction('[Project Component] Create Project', props<{ project: Project }>());
export const updateProject  = createAction('[Project Component] Update Project', props<{ project: Project }>());
export const pushProject    = createAction('[Project Component] Push Project', props<{ project: Project }>());

export const setProject = createAction('[Project Component] Ser Project', props<{ project: Project }>());

export const loadProjects         = createAction('[Project Component] Load Projects');
export const loadProjectsSuccess  = createAction('[Project Component] Load Projects Success', props<{ projects: Project[] }>());
export const setError             = createAction('[Project Component] Set Error', props<{ payload: any }>());

export const loadProject = createAction('[Project Component] Load Project', props<{ projectId: number }>());

export const activeForm       = createAction('[Project Component] Active Form', props<{ active: boolean }>());
export const activeFormUpdate = createAction('[Project Component] Active Form Update', props<{ project: Project }>());

export const updateProjectActive = createAction('[Project Component] Update Project Active', props<{ projectId: number }>());
