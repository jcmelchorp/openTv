import { createFeatureSelector, createSelector } from "@ngrx/store";
import { configFeatureKey, ConfigState } from "./config.reducer";

export const selectConfigState =
    createFeatureSelector<ConfigState>(configFeatureKey);

export const isDarkMode = createSelector(
    selectConfigState,
    (config: ConfigState): boolean => !!config.isDark
);