import {Project, Requirement} from '@core/models';
import {createReducer, on} from '@ngrx/store';

import {appState} from '../../../app.reducers';
import {
  activeForm,
  activeFormR,
  activeFormRUpdate,
  activeFormUpdate,
  loadProject,
  loadProjects,
  loadProjectsFilter,
  loadProjectsSuccess,
  loadRequirements,
  pushProject,
  requirementLoadedSuccess,
  setError, setFilterStatus,
  setProject,
} from './project.actions';
import {ProjectInterfaceFilter} from "@core/interfaces";
import {EProjectStatus} from "@core/enums";

export const projectFeatureKey = 'projectFeature';

export interface projectState {
  project: Project;
  requirement: Requirement;
  activeFormR: boolean;
  editModeR: boolean;
  projects: Project[];
  filter: ProjectInterfaceFilter,
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
  filter: {status: EProjectStatus.ALL, take: 30, skip: 0},
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
  on(pushProject, (state, {project}) => ({
    ...state,
    loading: false,
    loaded: true,
    projects: [project, ...state.projects],
    activeForm: false,
  })),
  on(loadProjects, (state) => ({...state, loaded: false, loading: true})),
  on(loadProjectsFilter, (state) => ({...state, loading: true})),
  on(loadProjectsSuccess, (state, {projects}) => ({
    ...state,
    loaded: true,
    loading: false,
    projects: [...projects],
  })),
  on(loadProject, (state) => ({...state, loading: true})),
  on(setFilterStatus, (state, {status}) => ({...state, filter: {...state.filter, status}})),
  on(activeForm, (state, {active}) => ({
    ...state,
    activeForm: active,
    editMode: false,
  })),
  on(activeFormUpdate, (state, {project}) => ({
    ...state,
    activeForm: true,
    editMode: true,
    project: {...project},
  })),
  on(setProject, (state, {project}) => ({
    ...state,
    project: {...project},
    loaded: true,
    loading: false,
    activeForm: false,
    editMode: false,
  })),

  on(loadRequirements, (state) => ({...state, loading: true})),
  on(requirementLoadedSuccess, (state, {requirements}) => ({
    ...state,
    loading: false,
    requirements: [...requirements]
  })),
  on(activeFormR, (state, {active}) => ({
    ...state,
    activeFormR: active,
    editModeR: false,
  })),
  on(activeFormRUpdate, (state, {requirement}) => ({
    ...state,
    activeFormR: true,
    editModeR: true,
    requirement: {...requirement},
  })),

  on(setError, (state, {payload}) => ({
    ...state,
    loaded: false,
    loading: false,
    error: {...payload},
  }))
);
