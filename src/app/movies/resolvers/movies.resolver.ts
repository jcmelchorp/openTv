import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, concatMap, filter, first, map, mergeMap, switchAll, switchMap, tap } from "rxjs";
import { MoviesEntityService } from "src/app/store/movie/movies-entity.service";

@Injectable()
export class MoviesResolver implements Resolve<boolean> {
    constructor(private moviesEntityService: MoviesEntityService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.moviesEntityService.loaded$.pipe(
            tap((loaded) => {
                if (!loaded) {
                    this.moviesEntityService.getAll();
                }
            }),
            filter((loaded) => !!loaded),
            first()
        );
    }
}
// @Injectable()
// export class MoviesResolver implements Resolve<MovieDto[]> {
//     constructor(private readonly moviesEntityService: MoviesEntityService) { }
//     resolve(
//         route: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot
//     ): Observable<MovieDto[]> {
//         return this.moviesEntityService.loaded$.pipe(
//             mergeMap((loaded) => {
//                 return (!loaded) ? this.moviesEntityService.getAll() : this.moviesEntityService.entities$
//             }),
//             // filter((loaded) => !!loaded),
//             // first()
//         );
//     }
// }
// export const MoviesResolver: ResolveFn<MovieDto[]> = (
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot,
//     moviesEntityService: MoviesEntityService = inject(MoviesEntityService)
// ): Observable<MovieDto[]> => moviesEntityService.getAll();