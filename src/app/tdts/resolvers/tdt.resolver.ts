import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { TdtsEntityService } from 'src/app/store/tdt/tdts-entity.service';

// @Injectable()
// export class TdtResolver implements Resolve<TdtDto> {
//     constructor(private readonly tdtsEntityService: TdtsEntityService) { }
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TdtDto> {
//         // return this.tdtsEntityService.getByKey(route.params['id'])
//         return this.tdtsEntityService.entities$.pipe(map((tdts) => tdts.find((tdt) => tdt.id === route.params['id'])))
//     }
// }
@Injectable()
export class TdtResolver implements Resolve<boolean> {
    constructor(private readonly tdtsEntityService: TdtsEntityService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.tdtsEntityService.loaded$.pipe(
            tap((loaded) => {
                if (!loaded) {
                    this.tdtsEntityService.entities$.pipe(map(tdts => tdts.find(tdt => tdt.channelId === route.params['id'])));
                }
            }),
            filter((loaded) => !!loaded),
            first()
        );
    }
}