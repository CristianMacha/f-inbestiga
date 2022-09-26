import { ActionReducerMap } from "@ngrx/store";

import * as ui from "./shared/ui.reducers";

export interface appState {
    ui: ui.uiState
}

export const appReducer: ActionReducerMap<appState> =  {
    ui: ui.uiReducer,
};
