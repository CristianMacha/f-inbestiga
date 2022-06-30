import { createFeatureSelector, createSelector } from "@ngrx/store";
import { appState } from "../app.reducers";
import { uiState } from "./ui.reducers";

export const uiFeature = (state: appState) => state.ui

export const uiFeatureIsLoading = createSelector(
    uiFeature,
    (state: uiState) => state.isLoading,
);

export const uiFeatureIsAuthenticate = createSelector(
    uiFeature,
    (state: uiState) => state.isAuthenticate,
);

export const uiFeatureUser = createSelector(
    uiFeature,
    (state: uiState) => state.user,
);
