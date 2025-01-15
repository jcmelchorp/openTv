
import { HlsVideoPlayerDirective } from "./hls-video-player.directive";
import { VideojsPlayerDirective } from "./videojs-player.directive";

export const sharedDirectives: any[] = [
    HlsVideoPlayerDirective,
    VideojsPlayerDirective
];

export * from './hls-video-player.directive';
export * from './videojs-player.directive'