import { Injectable } from '@angular/core';

import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
// import { GapiService } from '@rds-auth/services';
// import { getUser, signOutCompleted } from '@rds-auth/state/auth.actions';
// import { loadApp, loadAppFail, loadAppSuccess, localStoreUser } from '@rds-store/actions/app.actions';

import { defer, from, Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class AppEffects {
  // loadApp$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(loadApp, ROOT_EFFECTS_INIT),
  //     switchMap(() =>
  //       of(this.gapiService.handleClientLoad()).pipe(
  //         switchMap(() => of(loadAppSuccess()))
  //       )
  //     ),
  //     catchError((err) => of(loadAppFail(err)))
  //   )
  // );
  /*  localStoreUser$ = createEffect(
     () =>
       this.actions$.pipe(
         ofType(localStoreUser),
         tap((action) =>
           localStorage.setItem('user', JSON.stringify(action.user))
         )
       ),
     { dispatch: false }
   );
   removeUser$ = createEffect(
     () =>
       this.actions$.pipe(
         ofType(signOutCompleted),
         tap(() =>
           localStorage.removeItem('user')
         )
       ),
     { dispatch: false }
   ); */
  /* init$: Observable<any> = createEffect(() =>
    defer(() => {
      return of(getUser());
    })
  ); */
  constructor(private actions$: Actions, /*private gapiService: GapiService*/) { }
}
