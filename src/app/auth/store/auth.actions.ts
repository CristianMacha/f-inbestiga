import { createAction, props } from "@ngrx/store";

// export const login          = createAction('[Login Component] Login', props<{ login: ILogin}>());
// export const loginSuccess   = createAction('[Login Component] Login Success');
export const loginError     = createAction('[Login Component] Login Error', props<{ payload: any }>());
