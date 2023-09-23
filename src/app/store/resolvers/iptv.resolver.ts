import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { IptvEntityService } from 'src/app/store/iptv/iptv-entity.service';

@Injectable()
export class IptvResolver implements Resolve<boolean> {
    constructor(private iptvEntityService: IptvEntityService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.iptvEntityService.loaded$.pipe(
            tap((loaded) => {
                if (!loaded) {
                    this.iptvEntityService.getAll();
                }
            }),
            filter((loaded) => !!loaded),
            first()
        );
    }
}