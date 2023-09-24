import { IptvListComponent } from "./iptv-list/iptv-list.component";
import { PlayerComponent } from "./player/player.component";

export const iptvComponents: any[] = [
    PlayerComponent,
    IptvListComponent
];
export * from "./player/player.component";
export * from "./iptv-list/iptv-list.component";