import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, concatMap, filter, first, map, mergeMap, switchAll, switchMap, tap } from "rxjs";
import { TdtsEntityService } from "src/app/store/tdt/tdts-entity.service";

@Injectable()
export class TdtsResolver implements Resolve<boolean> {
    constructor(private tdtsEntityService: TdtsEntityService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.tdtsEntityService.loaded$.pipe(
            tap((loaded) => {
                if (!loaded) {
                    this.tdtsEntityService.getAll();
                }
            }),
            filter((loaded) => !!loaded),
            first()
        );
    }
}
// @Injectable()
// export class TdtsResolver implements Resolve<TdtDto[]> {
//     constructor(private readonly tdtsEntityService: TdtsEntityService) { }
//     resolve(
//         route: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot
//     ): Observable<TdtDto[]> {
//         return this.tdtsEntityService.loaded$.pipe(
//             mergeMap((loaded) => {
//                 return (!loaded) ? this.tdtsEntityService.getAll() : this.tdtsEntityService.entities$
//             }),
//             // filter((loaded) => !!loaded),
//             // first()
//         );
//     }
// }
// export const TdtsResolver: ResolveFn<TdtDto[]> = (
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot,
//     tdtsEntityService: TdtsEntityService = inject(TdtsEntityService)
// ): Observable<TdtDto[]> => tdtsEntityService.getAll();