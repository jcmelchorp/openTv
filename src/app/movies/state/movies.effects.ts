import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ROUTER_NAVIGATION, RouterNavigatedAction } from "@ngrx/router-store";
import { filter, map, withLatestFrom } from "rxjs";
import { MoviesEntityService } from "src/app/store/movie/movies-entity.service";

@Injectable()
export class MoviesEffects {
    constructor(
        private actions$: Actions,
        private moviesEntityService: MoviesEntityService
    ) { }
    getSingleMovie$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ROUTER_NAVIGATION),
                filter((r: RouterNavigatedAction) =>
                    r.payload.routerState.url.startsWith('/movies')
                ),
                //tap((r: RouterNavigatedAction) => console.log(r.payload.routerState)),
                map((r: RouterNavigatedAction) => r.payload.routerState['params']['id']),
                withLatestFrom(this.moviesEntityService.entities$),
                map(([id, movies]) => {
                    if (!movies) {
                        return this.moviesEntityService.getByKey(id)
                    }
                    return movies.find(u => u.id == id)
                })
            ),
        { dispatch: false }
    );

    getMovies$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ROUTER_NAVIGATION),
                filter((r: RouterNavigatedAction) =>
                    r.payload.routerState.url.startsWith('/movies')
                ),
                map((r: RouterNavigatedAction) => r.payload.routerState.url),
                withLatestFrom(this.moviesEntityService.entities$),
                map((users) => {
                    if (!users) {
                        return this.moviesEntityService.getAll();
                    }
                    return users;
                })
            ),
        { dispatch: false }
    );
}