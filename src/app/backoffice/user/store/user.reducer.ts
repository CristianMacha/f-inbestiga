import { createReducer, on } from "@ngrx/store";
import { Person, User } from "@core/models";

import { appState } from "../../../app.reducers";
import { activeForm, activeFormUpdate, addPerson, loadError, loadPersons, loadPersonsSuccess, setPerson } from "./user.actions";

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
  on(addPerson, (state, { person }) => ({ ...state, loading: false, loaded: true, persons: [person, ...state.persons], activeForm: false })),
  on(loadPersons, (state) => ({ ...state, loaded: false, loading: true })),
  on(loadPersonsSuccess, (state, { persons }) => ({ ...state, loaded: true, loading: false, persons: [...persons] })),
  on(activeForm, (state, { active }) => ({ ...state, activeForm: active, editMode: false })),
  on(activeFormUpdate, (state, { person }) => ({ ...state, activeForm: true, editMode: true, person: { ...person } })),
  on(setPerson, (state, { person }) => ({ ...state, activeForm: false, editMode: false, person: { ...person } })),
  on(loadError, (state, { payload }) => ({ ...state, loaded: false, loading: false, error: { ...payload } })),
);
