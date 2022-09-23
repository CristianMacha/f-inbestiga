import { createReducer, on } from "@ngrx/store";

import { appState } from "../../app.reducers";
import { loginError } from "./auth.actions";

export const authFeatureKey = 'authFeature';

export interface authState {
    error: any,
}

export interface AppStateAuthFeature extends appState {
    authFeature: authState,
}

export const initialState: authState = {
    error: null,
}

export const _authReducer = createReducer(
    initialState,
    on(loginError, (state, { payload }) => ({ ...state, error: payload }))
);
