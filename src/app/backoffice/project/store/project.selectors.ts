import { createSelector } from "@ngrx/store";

import { AppStateProjectFeature, projectState } from "./project.reducers";

export const projectFeature = (state: AppStateProjectFeature) => state.projectFeature;

export const projectFeatureProjects         = createSelector(projectFeature, (state) => state.projects);
export const projectFeatureProject          = createSelector(projectFeature, (state) => state.project);
export const projectFeatureActiveForm       = createSelector(projectFeature, (state) => state.activeForm);
export const projectFeatureEditMode         = createSelector(projectFeature, (state) => state.editMode);
export const projectFeatureLoading          = createSelector(projectFeature, (state) => state.loading);
export const projectFeaturePRequirements    = createSelector(projectFeature, (state) => state.requirements);
export const projectFeatureActiveFormR      = createSelector(projectFeature, (state) => state.activeFormR);
export const projectFeatureEditModeR        = createSelector(projectFeature, (state) => state.editModeR);
export const projectFeatureFilter           = createSelector(projectFeature, (state) => state.filter);
