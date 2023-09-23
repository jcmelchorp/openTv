import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { RouterNavigatedAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

// import * as fromAuthActions from '@rds-auth/state/auth.actions';

import { filter, map, tap, withLatestFrom } from 'rxjs/operators';


@Injectable()
export class RouteEffects {
  /* getSingleCourse$ = createEffect(
    () => this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => r.payload.routerState.url.startsWith('/courses/edit')),
      map((r: RouterNavigatedAction) => r.payload.routerState['params']['id']),
      withLatestFrom(this.coursesEntityService.entities$),
      map(([id, courses]) => {
        if (!courses) {
          return this.coursesEntityService.getByKey(id)
        }
        return courses.find(u => u.id == id)
      })
    ),
    { dispatch: false }
  ); */
  /* getCourses$ = createEffect(
    () => this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => r.payload.routerState.url.startsWith('/courses')),
      map((r: RouterNavigatedAction) => r.payload.routerState.url),
      withLatestFrom(this.coursesEntityService.entities$),
      map((courses) => {
        if (!courses) {
          return this.coursesEntityService.getAll()
        }
        return courses
      })
    ),
    { dispatch: false }
  ); */

  goroot$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(/*fromAuthActions.signInSuccess*/),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );
  gohome$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(/*fromAuthActions.signOutCompleted*/),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private router: Router) { }
}