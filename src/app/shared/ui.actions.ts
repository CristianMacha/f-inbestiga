import {createAction, props} from "@ngrx/store";
import {ILogin} from "@core/interfaces";
import {Person, PersonRoles, ResourceModel, Role, User} from "@core/models";

export const loading = createAction('[UI Component] Loading');
export const stopLoading = createAction('[UI Component] Stop Loading');

export const login = createAction('[UI Component] Login', props<{ login: ILogin }>());
export const setUser = createAction('[IU Component] Set User', props<{ user: User }>());
export const unsetUser = createAction('[IU Component] Unset User');
export const refreshToken = createAction('[UI Component] Refresh Token');

export const loginError = createAction('[UI Component] Login Error', props<{ payload: any }>());

export const loadPersonRoles = createAction('[UI Component] Load Person Roles');
export const personRolesLoadedSuccess = createAction('[UI Component] Person Roles Loaded Success', props<{ personRoles: PersonRoles[] }>());
export const loadRoleSelected = createAction('[UI Component] Load Role Selected', props<{ roleId: number }>());
export const roleSelectedLoadedSuccess = createAction('[UI Component] Role Selected Loaded Success', props<{ role: Role }>());

export const loadPerson = createAction('[UI Component] Load Person', props<{ userId: number }>());
export const personLoadedSuccess = createAction('[UI Component] Person Loaded Success', props<{ person: Person }>());

export const loadResources = createAction('[UI Component] Load Resource', props<{ resources: ResourceModel[] }>());
