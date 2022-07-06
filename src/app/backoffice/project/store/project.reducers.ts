import { Project } from "@core/models";
import { createReducer, on } from "@ngrx/store";

import { appState } from "../../../app.reducers";
import { activeForm, activeFormUpdate, loadProjects, loadProjectsSuccess, pushProject, setError, setProject } from "./project.actions";

export const projectFeatureKey = 'projectFeature';

export interface projectState {
  project: Project,
  projects: Project[],
  loaded: boolean,
  loading: boolean,
  activeForm: boolean,
  editMode: boolean,
  error: any,
}

export interface AppStateProjectFeature extends appState {
  projectFeature: projectState,
}

export const initialState: projectState = {
  project: new Project(),
  projects: [],
  loading: false,
  loaded: false,
  activeForm: false,
  editMode: false,
  error: null
}

export const _projectReducer = createReducer(
  initialState,
  on(pushProject, (state, { project }) => ({ ...state, loading: false, loaded: true, projects: [project, ...state.projects], activeForm: false })),
  on(loadProjects, (state) => ({ ...state, loaded: false, loading: true })),
  on(loadProjectsSuccess, (state, { projects }) => ({ ...state, loaded: true, loading: false, projects: [...projects] })),
  on(activeForm, (state, { active }) => ({ ...state, activeForm: active, editMode: false })),
  on(activeFormUpdate, (state, { project }) => ({ ...state, activeForm: true, editMode: true, project: { ...project } })),
  on(setProject, (state, { project }) => ({ ...state, project: { ...project } })),
  on(setError, (state, { payload }) => ({ ...state, loaded: false, loading: false, error: { ...payload } })),
);
