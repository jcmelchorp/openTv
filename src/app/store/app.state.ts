import { isDevMode } from "@angular/core";
import { RouterState, routerReducer } from "@ngrx/router-store";
import { Action, ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { routerKey } from "./router";
import { environment } from "src/environments/environment";
import { ConfigState, configFeatureKey, configReducer } from "../core/state/config.reducer";
export interface AppState {
    // [authFeatureKey]: AuthenticationState;
    [routerKey]: RouterState;
    [configFeatureKey]: ConfigState
}
export const reducers: ActionReducerMap<AppState> = {
    // [authFeatureKey]: authReducer,
    [routerKey]: routerReducer,
    [configFeatureKey]: configReducer
};
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [debug] : [];

export function debug(
    reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
    return (state: AppState | undefined, action: Action) => {
        console.groupCollapsed(`Action type: ${action.type}`);
        console.log(
            `%c Preview State: `,
            `color: #007bb4; font-weight: bold`,
            state
        );
        console.log(`%c Action: `, `color: #b46c00; font-weight: bold`, action);
        const nextState = reducer(state, action);
        console.log(
            `%c Next State: `,
            `color: #196d00; font-weight: bold`,
            nextState
        );
        console.groupEnd();
        return nextState;
    };
}
