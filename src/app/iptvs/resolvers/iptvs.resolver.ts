import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, concatMap, filter, first, map, mergeMap, switchAll, switchMap, tap } from "rxjs";
import { IptvsEntityService } from "src/app/store/iptv/iptvs-entity.service";
import { IptvDto } from "../models/iptv-dto.model";

@Injectable()
export class IptvsResolver implements Resolve<boolean> {
    constructor(private iptvsEntityService: IptvsEntityService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.iptvsEntityService.loaded$.pipe(
            tap((loaded) => {
                if (!loaded) {
                    this.iptvsEntityService.getAll();
                }
            }),
            filter((loaded) => !!loaded),
            first()
        );
    }
}
// @Injectable()
// export class IptvsResolver implements Resolve<IptvDto[]> {
//     constructor(private readonly iptvsEntityService: IptvsEntityService) { }
//     resolve(
//         route: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot
//     ): Observable<IptvDto[]> {
//         return this.iptvsEntityService.loaded$.pipe(
//             mergeMap((loaded) => {
//                 return (!loaded) ? this.iptvsEntityService.getAll() : this.iptvsEntityService.entities$
//             }),
//             // filter((loaded) => !!loaded),
//             // first()
//         );
//     }
// }
// export const IptvsResolver: ResolveFn<IptvDto[]> = (
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot,
//     iptvsEntityService: IptvsEntityService = inject(IptvsEntityService)
// ): Observable<IptvDto[]> => iptvsEntityService.getAll();