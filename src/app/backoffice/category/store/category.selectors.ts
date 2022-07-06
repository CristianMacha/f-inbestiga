import { createSelector } from '@ngrx/store';
import { AppStateCategoryFeature, categoryState } from './category.reducer';

export const categoryFeature = (state: AppStateCategoryFeature) =>
  state.categoryFeature;

export const categoriesFeature = createSelector(
  categoryFeature,
  (state: categoryState) => state.categories
);

export const categoryFeatureActiveForm = createSelector(
  categoryFeature,
  (state: categoryState) => state.activeForm
);

export const categoryFeatureLoading = createSelector(
  categoryFeature,
  (state: categoryState) => state.loading
);
