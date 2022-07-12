import { state } from '@angular/animations';
import { Project, Requirement } from '@core/models';
import { createReducer, on } from '@ngrx/store';

import { appState } from '../../../app.reducers';
import {
  activeForm,
  activeFormR,
  activeFormRUpdate,
  activeFormUpdate,
  loadProject,
  loadProjects,
  loadProjectsSuccess,
  loadRequirements,
  pushProject,
  requirementLoadedSuccess,
  setError,
  setProject,
} from './project.actions';

export const projectFeatureKey = 'projectFeature';

export interface projectState {
  project: Project;
  requirement: Requirement;
  activeFormR: boolean;
  editModeR: boolean;
  projects: Project[];
  requirements: Requirement[];
  loaded: boolean;
  loading: boolean;
  activeForm: boolean;
  editMode: boolean;
  viewMode: boolean;
  error: any;
}

export interface AppStateProjectFeature extends appState {
  projectFeature: projectState;
}

export const initialState: projectState = {
  project: new Project(),
  requirement: new Requirement(),
  activeFormR: false,
  editModeR: false,
  projects: [],
  requirements: [],
  loading: false,
  loaded: false,
  activeForm: false,
  editMode: false,
  viewMode: false,
  error: null,
};

export const _projectReducer = createReducer(
  initialState,
  on(pushProject, (state, { project }) => ({
    ...state,
    loading: false,
    loaded: true,
    projects: [project, ...state.projects],
    activeForm: false,
  })),
  on(loadProjects, (state) => ({ ...state, loaded: false, loading: true })),
  on(loadProjectsSuccess, (state, { projects }) => ({
    ...state,
    loaded: true,
    loading: false,
    projects: [...projects],
  })),
  on(loadProject, (state) => ({ ...state, loading: true })),
  on(activeForm, (state, { active }) => ({
    ...state,
    activeForm: active,
    editMode: false,
  })),
  on(activeFormUpdate, (state, { project }) => ({
    ...state,
    activeForm: true,
    editMode: true,
    project: { ...project },
  })),
  on(setProject, (state, { project }) => ({
    ...state,
    project: { ...project },
    loaded: true,
    loading: false,
    activeForm: false,
    editMode: false,
  })),

  on(loadRequirements, (state) => ({ ...state, loading: true })),
  on(requirementLoadedSuccess, (state, { requirements }) => ({
    ...state,
    loading: false,
    requirements: [ ...requirements]
  })),
  on(activeFormR, (state, { active }) => ({
    ...state,
    activeFormR: active,
    editModeR: false,
  })),
  on(activeFormRUpdate, (state, { requirement }) => ({
    ...state,
    activeFormR: true,
    editModeR: true,
    requirement: { ...requirement },
  })),

  on(setError, (state, { payload }) => ({
    ...state,
    loaded: false,
    loading: false,
    error: { ...payload },
  }))
);
