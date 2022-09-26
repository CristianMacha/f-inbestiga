import { createFeatureSelector, createSelector } from "@ngrx/store";
import { appState } from "../app.reducers";
import { uiState } from "./ui.reducers";

export const uiFeature = (state: appState) => state.ui

export const uiFeatureIsLoading = createSelector(uiFeature,(state: uiState) => state.isLoading);

export const uiFeatureIsAuthenticate = createSelector(uiFeature,(state: uiState) => state.isAuthenticate);

export const uiFeatureUser = createSelector(uiFeature,(state: uiState) => state.user);

export const uiPersonRoles = createSelector(uiFeature, (state) => state.personRoles);
export const uiRoleSelected = createSelector(uiFeature, (state) => state.roleSelected);

export const uiPerson = createSelector(uiFeature, (state) => state.person);
export const uiResources = createSelector(uiFeature, (state) => state.resources);
