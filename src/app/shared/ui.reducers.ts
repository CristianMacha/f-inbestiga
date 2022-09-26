import {createReducer, on} from "@ngrx/store";

import {Person, PersonRoles, ResourceModel, Role, User} from "@core/models";
import {
  loadResources,
  login,
  loginError,
  personLoadedSuccess,
  personRolesLoadedSuccess,
  refreshToken,
  roleSelectedLoadedSuccess,
  setUser,
  unsetUser,
  logout
} from "./ui.actions";

export interface uiState {
  isLoading: boolean,
  isAuthenticate: boolean,
  user: User,
  person: Person,
  personRoles: PersonRoles[],
  roleSelected: Role,
  resources: ResourceModel[],
  error: any
}

export const initialUiState: uiState = {
  isLoading: false,
  isAuthenticate: false,
  user: new User(),
  person: new Person(),
  personRoles: [],
  roleSelected: new Role(),
  resources: [],
  error: null
};

export const uiReducer = createReducer(
  initialUiState,
  on(refreshToken, (state) => ({...state, isLoading: true})),
  on(login, (state) => ({...state, isLoading: true})),
  on(logout, (state) => ({
    ...state,
    isAuthenticate: false,
    user: new User(),
    person: new Person(),
    personRoles: [],
    roleSelected: new Role(),
    resources: [],
  })),
  on(setUser, (state, {user}) => ({...state, user: {...user}, isLoading: true, isAuthenticate: true, error: null})),
  on(unsetUser, (state) => ({...state, isLoading: false, user: new User(), isAuthenticate: false})),

  on(personRolesLoadedSuccess, (state, {personRoles}) => ({...state, isLoading: false, personRoles: [...personRoles]})),
  on(roleSelectedLoadedSuccess, (state, {role}) => ({...state, isLoading: false, roleSelected: {...role}})),
  on(loginError, (state, {payload}) => ({...state, isLoading: false, isAuthenticate: false, error: {...payload}})),

  on(loadResources, (state, {resources}) => ({...state, resources: [...resources]})),

  on(personLoadedSuccess, (state, {person}) => ({...state, isLoading: false, person: {...person}}))
);
