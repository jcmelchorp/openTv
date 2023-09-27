import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { IptvsEntityService } from '../../store/iptv/iptvs-entity.service';
import { IptvDto } from '../models/iptv-dto.model';

// @Injectable()
// export class IptvResolver implements Resolve<IptvDto> {
//     constructor(private readonly iptvsEntityService: IptvsEntityService) { }
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IptvDto> {
//         // return this.iptvsEntityService.getByKey(route.params['id'])
//         return this.iptvsEntityService.entities$.pipe(map((iptvs) => iptvs.find((iptv) => iptv.id === route.params['id'])))
//     }
// }
@Injectable()
export class IptvResolver implements Resolve<boolean> {
    constructor(private readonly iptvsEntityService: IptvsEntityService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.iptvsEntityService.loaded$.pipe(
            tap((loaded) => {
                if (!loaded) {
                    this.iptvsEntityService.entities$.pipe(map(iptvs => iptvs.find(iptv => iptv.channelId === route.params['id'])));
                }
            }),
            filter((loaded) => !!loaded),
            first()
        );
    }
}