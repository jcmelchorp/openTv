import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ROUTER_NAVIGATION, RouterNavigatedAction } from "@ngrx/router-store";
import { filter, map, withLatestFrom } from "rxjs";
import { TdtsEntityService } from "src/app/store/tdt/tdts-entity.service";

@Injectable()
export class TdtsEffects {
    constructor(
        private actions$: Actions,
        private tdtsEntityService: TdtsEntityService
    ) { }
    getSingleTdt$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ROUTER_NAVIGATION),
                filter((r: RouterNavigatedAction) =>
                    r.payload.routerState.url.startsWith('/tdts')
                ),
                //tap((r: RouterNavigatedAction) => console.log(r.payload.routerState)),
                map((r: RouterNavigatedAction) => r.payload.routerState['params']['id']),
                withLatestFrom(this.tdtsEntityService.entities$),
                map(([id, tdts]) => {
                    if (!tdts) {
                        return this.tdtsEntityService.getByKey(id)
                    }
                    return tdts.find(u => u.id == id)
                })
            ),
        { dispatch: false }
    );

    getTdts$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ROUTER_NAVIGATION),
                filter((r: RouterNavigatedAction) =>
                    r.payload.routerState.url.startsWith('/player')
                ),
                map((r: RouterNavigatedAction) => r.payload.routerState.url),
                withLatestFrom(this.tdtsEntityService.entities$),
                map((users) => {
                    if (!users) {
                        return this.tdtsEntityService.getAll();
                    }
                    return users;
                })
            ),
        { dispatch: false }
    );
}