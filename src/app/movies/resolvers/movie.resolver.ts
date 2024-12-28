import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { MoviesEntityService } from 'src/app/store/movie/movies-entity.service';

// @Injectable()
// export class MovieResolver implements Resolve<MovieDto> {
//     constructor(private readonly moviesEntityService: MoviesEntityService) { }
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MovieDto> {
//         // return this.moviesEntityService.getByKey(route.params['id'])
//         return this.moviesEntityService.entities$.pipe(map((movies) => movies.find((movie) => movie.id === route.params['id'])))
//     }
// }
@Injectable()
export class MovieResolver implements Resolve<boolean> {
    constructor(private readonly moviesEntityService: MoviesEntityService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.moviesEntityService.loaded$.pipe(
            tap((loaded) => {
                if (!loaded) {
                    this.moviesEntityService.entities$.pipe(map(movies => movies.find(movie => movie.id === route.params['id'])));
                }
            }),
            filter((loaded) => !!loaded),
            first()
        );
    }
}