import { createAction, props } from "@ngrx/store";

export const toggleDarkMode = createAction(
  '[Core Theme] Toggle dark mode',
  props<{ isDark: boolean }>()
);
export const toggleDarkModeSuccess = createAction(
  '[Core Theme] Toggle dark mode success',
  props<{ isDark: boolean }>()
);
export const toggleDarkModeFail = createAction(
  '[Core Theme] Toggle dark mode fail',
  props<{ error: any }>()

);
export const saveDarkMode = createAction(
  '[Core Theme] Save dark mode',
  props<{ isDark: boolean }>()
);
export const removeDarkMode = createAction(
  '[Core Theme] Remove dark mode',
);
export const setDarkMode = createAction(
  '[Core Theme] Set dark mode',
  props<{ isDark: boolean }>()
);
export const setDarkModeSuccess = createAction(
  '[Core Theme] Set dark mode success',
  props<{ isDark: boolean }>()
);
export const setDarkModeFail = createAction(
  '[Core Theme] Set dark mode fail',
  props<{ error: any }>()
);
export const changeDarkMode = createAction(
  '[Core Theme] Change dark mode',
  props<{ isDark: boolean }>()
);