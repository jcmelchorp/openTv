import { IptvListComponent } from './iptv-list/iptv-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PlayerComponent } from './player/player.component';
import { SettingsComponent } from './settings/settings.component';
import { SnackComponent } from './snack/snack.component';
import { WellcomeComponent } from './wellcome/wellcome.component';

export const coreComponents: any[] = [
  WellcomeComponent,
  SettingsComponent,
  NotFoundComponent,
  PlayerComponent,
  IptvListComponent,
  SnackComponent
]
export * from './wellcome/wellcome.component';
export * from './settings/settings.component';
export * from './player/player.component';
export * from './iptv-list/iptv-list.component';
export * from './not-found/not-found.component';
export * from './snack/snack.component';
