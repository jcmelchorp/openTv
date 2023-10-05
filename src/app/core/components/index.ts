import { SettingsComponent } from './settings/settings.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { StartTitleComponent } from './start-title/start-title.component';
import { WellcomeComponent } from './wellcome/wellcome.component';

export const coreComponents: any[] = [
  WellcomeComponent,
  SettingsComponent,
  StartTitleComponent,
  SpinnerComponent
]
export * from './wellcome/wellcome.component';
export * from './settings/settings.component';
export * from './start-title/start-title.component';
export * from './spinner/spinner.component';