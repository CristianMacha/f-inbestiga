import { createSelector } from "@ngrx/store";
import { AppStateUserFeature, userState } from "./user.reducer";

export const userFeature = (state: AppStateUserFeature) => state.userFeature;

export const userFeaturePersons = createSelector(
  userFeature,
  (state: userState) => state.persons,
);

export const userFeatureActiveForm = createSelector(
  userFeature,
  (state: userState) => state.activeForm,
);
