import { createReducer, on } from "@ngrx/store";

import { User } from "@core/models";
import { loading, login, loginError, refreshToken, setUser, stopLoading, unsetUser } from "./ui.actions";

export interface uiState {
    isLoading: boolean,
    isAuthenticate: boolean,
    user: User
}

export const initialUiState: uiState = {
    isLoading: true,
    isAuthenticate: false,
    user: new User()
};

export const uiReducer = createReducer(
    initialUiState,
    on(loading, (state) => ({ ...state, isLoading: true })),
    on(refreshToken, (state) => ({ ...state, isLoading: false })),
    on(stopLoading, (state) => ({ ...state, isLoading: false })),
    on(login, (state) => ({ ...state, isLoading: true })),
    on(setUser, (state, { user }) => ({ ...state, isLoading: false, user: { ...user }, isAuthenticate: true })),
    on(unsetUser, (state) => ({ ...state, isLoading: false, user: new User(), isAuthenticate: false })),
    on(loginError, (state, { payload }) => ({ ...state, isLoading: false, isAuthenticate: false, error: { ...payload } }))
);
