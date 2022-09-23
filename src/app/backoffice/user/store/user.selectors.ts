import { createSelector } from "@ngrx/store";
import { AppStateUserFeature, userState } from "./user.reducer";

export const userFeature = (state: AppStateUserFeature) => state.userFeature;

export const userFeaturePersons     = createSelector(userFeature, (state: userState) => state.persons);
export const userFeatureActiveForm  = createSelector(userFeature, (state: userState) => state.activeForm);
export const userFeatureLoading     = createSelector(userFeature, (state: userState) => state.loading);
export const userFeatureDetails     = createSelector(userFeature, (state: userState) => state.details);
export const userFeaturePerson      = createSelector(userFeature, (state: userState) => state.person);