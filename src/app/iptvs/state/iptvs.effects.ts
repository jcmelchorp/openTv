import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ROUTER_NAVIGATION, RouterNavigatedAction } from "@ngrx/router-store";
import { filter, map, withLatestFrom } from "rxjs";
import { IptvsEntityService } from "src/app/store/iptv/iptvs-entity.service";

@Injectable()
export class IptvsEffects {
    constructor(
        private actions$: Actions,
        private iptvsEntityService: IptvsEntityService
    ) { }
    getSingleIptv$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ROUTER_NAVIGATION),
                filter((r: RouterNavigatedAction) =>
                    r.payload.routerState.url.startsWith('/iptvs')
                ),
                //tap((r: RouterNavigatedAction) => console.log(r.payload.routerState)),
                map((r: RouterNavigatedAction) => r.payload.routerState['params']['id']),
                withLatestFrom(this.iptvsEntityService.entities$),
                map(([id, iptvs]) => {
                    if (!iptvs) {
                        return this.iptvsEntityService.getByKey(id)
                    }
                    return iptvs.find(u => u.id == id)
                })
            ),
        { dispatch: false }
    );

    getIptvs$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ROUTER_NAVIGATION),
                filter((r: RouterNavigatedAction) =>
                    r.payload.routerState.url.startsWith('/player')
                ),
                map((r: RouterNavigatedAction) => r.payload.routerState.url),
                withLatestFrom(this.iptvsEntityService.entities$),
                map((users) => {
                    if (!users) {
                        return this.iptvsEntityService.getAll();
                    }
                    return users;
                })
            ),
        { dispatch: false }
    );
}