import { createAction, props } from "@ngrx/store";
import { ILogin } from "@core/interfaces";
import { User } from "@core/models";

export const loading        = createAction('[UI Component] Loading');
export const stopLoading    = createAction('[UI Component] Stop Loading');

export const login          = createAction('[UI Component] Login', props<{ login: ILogin }>());
export const setUser        = createAction('[IU Component] Set User', props<{ user: User }>());
export const unsetUser      = createAction('[IU Component] Unset User');
export const refreshToken   = createAction('[UI Component] Refresh Token');

export const loginError = createAction('[UI Component] Login Error', props<{ payload: any }>());