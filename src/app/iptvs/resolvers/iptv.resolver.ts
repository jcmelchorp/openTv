import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { IptvsEntityService } from '../../store/iptv/iptvs-entity.service';

@Injectable()
export class IptvResolver implements Resolve<boolean> {
    constructor(private iptvsEntityService: IptvsEntityService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.iptvsEntityService.loaded$.pipe(
            tap((loaded) => {
                if (!loaded) {
                    this.iptvsEntityService.getByKey(route.params['id']);
                }
            }),
            filter((loaded) => !!loaded),
            first()
        );
    }
}