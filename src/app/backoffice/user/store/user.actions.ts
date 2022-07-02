import { Person } from "@core/models";
import { createAction, props } from "@ngrx/store";

export const createPerson = createAction('[User Component] Create User', props<{ person: Person }>());
export const updatePerson = createAction('[User Component] Update User', props<{ person: Person }>());
export const addPerson    = createAction('[User Component] Add User', props<{ person: Person }>())

export const setPerson = createAction('[User Component] Set Person', props<{ person: Person }>())

export const loadPersons        = createAction('[User Component] Load Users');
export const loadPersonsSuccess = createAction('[User Component] Load User Success', props<{ persons: Person[] }>());
export const loadError          = createAction('[User Component] Load Error', props<{ payload: any }>());

export const activeForm       = createAction('[User Component] Activate Form', props<{ active: boolean }>());
export const activeFormUpdate = createAction('[User Component] Active Form Update', props<{ person: Person }>())