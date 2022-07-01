import { createReducer, on } from "@ngrx/store";
import { Person, User } from "@core/models";

import { appState } from "../../../app.reducers";
import { activateForm, addPerson, createPerson, deactivateteForm, editPerson, loadError, loadPersons, loadPersonsSuccess, updatePerson } from "./user.actions";

export const userFeatureKey = 'userFeature';

export interface userState {
  person: Person,
  persons: Person[],
  loading: boolean,
  loaded: boolean,
  activeForm: boolean,
  editMode: boolean,
  error: any,
}

export interface AppStateUserFeature extends appState {
  userFeature: userState,
}

export const initialState: userState = {
  person: new Person(),
  persons: [],
  loading: false,
  loaded: false,
  activeForm: false,
  editMode: false,
  error: null
};

export const _userReducer = createReducer(
  initialState,
  on(createPerson, (state) => ({ ...state, loading: true })),
  on(updatePerson, (state) => ({ ...state, loading: true })),
  on(addPerson, (state, { person }) => ({ ...state, loading: false, loaded: true, persons: [person, ...state.persons] })),
  on(loadPersons, (state) => ({ ...state, loaded: false, loading: true })),
  on(loadPersonsSuccess, (state, { persons }) => ({ ...state, loaded: true, loading: false, persons: [...persons] })),
  on(activateForm, (state) => ({ ...state, activeForm: true })),
  on(editPerson, (state) => ({ ...state, activeForm: true, editMode: true })),
  on(deactivateteForm, (state) => ({ ...state, activeForm: false, editMode: false })),
  on(loadError, (state, { payload }) => ({ ...state, loaded: true, loading: false, error: { ...payload } })),
);
