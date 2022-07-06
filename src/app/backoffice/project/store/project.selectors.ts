import { createSelector } from "@ngrx/store";

import { AppStateProjectFeature, projectState } from "./project.reducers";

export const projectFeature = (state: AppStateProjectFeature) => state.projectFeature;

export const projectFeatureProjects = createSelector(projectFeature, (state: projectState) => state.projects);
export const projectFeatureProject = createSelector(projectFeature, (state: projectState) => state.project);
export const projectFeatureActiveForm = createSelector(projectFeature, (state: projectState) => state.activeForm);
export const projectFeatureLoading = createSelector(projectFeature, (state: projectState) => state.loading);
