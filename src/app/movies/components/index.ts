import { MovieListComponent } from "./movie-list/movie-list.component";
import { MoviePlayerComponent } from "./movie-player/movie-player.component";
import { VjsPlayerComponent } from "./vjs-player/vjs-player.component";

export const movieComponents: any[] = [
    MovieListComponent,
    MoviePlayerComponent,
    VjsPlayerComponent
];
export * from './movie-list/movie-list.component';
export * from './movie-player/movie-player.component';
export * from './vjs-player/vjs-player.component'