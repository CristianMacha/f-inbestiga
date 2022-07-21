import {createReducer, on} from "@ngrx/store";

import {Person, PersonRoles, Role, User} from "@core/models";
import {
  loadPerson,
  loadPersonRoles,
  loadRoleSelected,
  login,
  loginError,
  personLoadedSuccess,
  personRolesLoadedSuccess,
  refreshToken,
  roleSelectedLoadedSuccess,
  setUser,
  unsetUser
} from "./ui.actions";

export interface uiState {
  isLoading: boolean,
  isAuthenticate: boolean,
  user: User,
  person: Person,
  personRoles: PersonRoles[],
  roleSelected: Role,
  error: any
}

export const initialUiState: uiState = {
  isLoading: true,
  isAuthenticate: false,
  user: new User(),
  person: new Person(),
  personRoles: [],
  roleSelected: new Role(),
  error: null
};

export const uiReducer = createReducer(
  initialUiState,
  on(refreshToken, (state) => ({...state, isLoading: true})),
  on(login, (state) => ({...state, isLoading: true})),
  on(setUser, (state, {user}) => ({...state, isLoading: true, user: {...user}, isAuthenticate: true, error: null})),
  on(unsetUser, (state) => ({...state, isLoading: false, user: new User(), isAuthenticate: false})),

  on(loadPersonRoles, (state) => ({...state, isLoading: true})),
  on(personRolesLoadedSuccess, (state, {personRoles}) => ({...state, isLoading: false, personRoles: [...personRoles]})),
  on(loadRoleSelected, (state) => ({...state, isLoading: true})),
  on(roleSelectedLoadedSuccess, (state, {role}) => ({...state, isLoading: false, roleSelected: {...role}})),
  on(loginError, (state, {payload}) => ({...state, isLoading: false, isAuthenticate: false, error: {...payload}})),

  on(loadPerson, (state) => ({...state, isLoading: true})),
  on(personLoadedSuccess, (state, {person}) => ({...state, isLoading: false, person: {...person}}))
);
