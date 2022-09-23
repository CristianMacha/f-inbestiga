import { Category } from "@core/models";
import { createAction, props } from "@ngrx/store";

export const createCategory = createAction('[Category Component] Create Category', props<{ category: Category }>());
export const updateCategory = createAction('[Category Component] Update Category', props<{ category: Category }>());
export const addCategory    = createAction('[Category Component] Add Category', props<{ category: Category }>())

export const setCategory = createAction('[Category Component] Set Category', props<{ category: Category }>())

export const loadCategories        = createAction('[Category Component] Load Category');
export const loadCategoriesSuccess = createAction('[Category Component] Load Category Success', props<{ categories: Category[] }>());
export const loadError          = createAction('[Category Component] Load Error', props<{ payload: any }>());

export const activeForm       = createAction('[Category Component] Activate Form', props<{ active: boolean }>());
export const activeFormUpdate = createAction('[Category Component] Active Form Update', props<{ category: Category }>())