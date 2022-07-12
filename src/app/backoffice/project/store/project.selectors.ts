import { createSelector } from "@ngrx/store";

import { AppStateProjectFeature, projectState } from "./project.reducers";

export const projectFeature = (state: AppStateProjectFeature) => state.projectFeature;

export const projectFeatureProjects         = createSelector(projectFeature, (state: projectState) => state.projects);
export const projectFeatureProject          = createSelector(projectFeature, (state: projectState) => state.project);
export const projectFeatureActiveForm       = createSelector(projectFeature, (state: projectState) => state.activeForm);
export const projectFeatureEditMode         = createSelector(projectFeature, (state: projectState) => state.editMode);
export const projectFeatureLoading          = createSelector(projectFeature, (state: projectState) => state.loading);
export const projectFeaturePRequirements    = createSelector(projectFeature, (state: projectState) => state.requirements);
export const projectFeatureActiveFormR      = createSelector(projectFeature, (state: projectState) => state.activeFormR);
export const projectFeatureEditModeR        = createSelector(projectFeature, (state: projectState) => state.editModeR);
