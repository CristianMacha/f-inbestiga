import { createReducer, on } from "@ngrx/store";
import { Category } from "@core/models";

import { appState } from "../../../app.reducers";
import { activeForm, activeFormUpdate, addCategory, loadCategories, loadCategoriesSuccess, loadError, setCategory } from "./category.actions";

export const categoryFeatureKey = 'categoryFeature';

export interface categoryState {
  category: Category,
  categories: Category[],
  loading: boolean,
  loaded: boolean,
  activeForm: boolean,
  editMode: boolean,
  error: any,
}

export interface AppStateCategoryFeature extends appState {
  categoryFeature: categoryState,
}

export const initialState: categoryState = {
  category: new Category(),
  categories: [],
  loading: false,
  loaded: false,
  activeForm: false,
  editMode: false,
  error: null
};

export const _categoryReducer = createReducer(
  initialState,
  on(addCategory, (state, { category }) => ({ ...state, loading: false, loaded: true, categories: [category, ...state.categories], activeForm: false })),
  on(loadCategories, (state) => ({ ...state, loaded: false, loading: true })),
  on(loadCategoriesSuccess, (state, { categories }) => ({ ...state, loaded: true, loading: false, categories: [...categories] })),
  on(activeForm, (state, { active }) => ({ ...state, activeForm: active, editMode: false })),
  on(activeFormUpdate, (state, { category }) => ({ ...state, activeForm: true, editMode: true, category: { ...category } })),
  on(setCategory, (state, { category }) => ({ ...state, activeForm: false, editMode: false, category: { ...category } })),
  on(loadError, (state, { payload }) => ({ ...state, loaded: false, loading: false, error: { ...payload } })),
);