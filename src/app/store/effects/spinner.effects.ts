import { Injectable } from '@angular/core';
import { EntityAction, EntityCacheAction, OP_ERROR, OP_SUCCESS, ofEntityOp } from '@ngrx/data';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    ROUTER_ERROR,
    ROUTER_NAVIGATED,
    ROUTER_NAVIGATION,
} from '@ngrx/router-store';

// import * as fromAuthActions from '@rds-auth/state/auth.actions';

import { NgxSpinnerService } from 'ngx-spinner';

import { filter, tap } from 'rxjs/operators';
import { loadApp, loadAppFail, loadAppSuccess } from '../actions/app.actions';

@Injectable()
export class SpinnerEffects {
    spinneron$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    loadApp
                    //   fromAuthActions.signIn,
                    //   fromAuthActions.signOut,
                ),
                tap(() => {
                    this.spinner.show('entitySpinner', {
                        type: 'ball-clip-rotate-multiple',
                        size: 'medium',
                        bdColor: 'rgba(51, 51, 51, 0.9)',
                        color: 'white',
                        fullScreen: true,
                    });
                })
            ),
        { dispatch: false }
    );

    spinneroff$ = createEffect(
        () =>
            this.actions$.pipe(
                ofEntityOp(),
                filter(
                    (ea: EntityAction) =>
                        ea.payload.entityOp.endsWith(OP_ERROR) ||
                        ea.payload.entityOp.endsWith(OP_SUCCESS)
                ),
                ofType(
                    loadAppSuccess,
                    loadAppFail,
                    // fromAuthActions.notAuthenticated,
                    // fromAuthActions.signInSuccess,
                    // fromAuthActions.signInFail,
                    // fromAuthActions.signOutCompleted,
                ),

                tap(() => {
                    setTimeout(() => {
                        this.spinner.hide('entitySpinner');
                    }, 200);
                })
            ),
        { dispatch: false }
    );
    // spinnerCacheOn$ = createEffect(
    //     () => this.actions$
    //         .pipe(
    //             ofType(EntityCacheAction.SET_ENTITY_CACHE),
    //             tap((action: EntityCacheAction) =>
    //                 this.spinner.show()
    //             )),
    //     { dispatch: false }
    // );

    constructor(private actions$: Actions, private spinner: NgxSpinnerService) { }
}
