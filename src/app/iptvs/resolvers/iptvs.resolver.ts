import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';
import { IptvsEntityService } from '../../store/iptv/iptvs-entity.service';

@Injectable()
export class IptvsResolver implements Resolve<boolean> {
    constructor(private iptvsEntityService: IptvsEntityService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.iptvsEntityService.loaded$.pipe(
            tap((loaded) => {
                if (!loaded) {
                    this.iptvsEntityService.getAll().pipe(
                        map((iptvs) => iptvs.filter((iptv) => iptv.countryCode === 'MX'))
                    );
                }
            }),
            filter((loaded) => !!loaded),
            first()
        );
    }
}