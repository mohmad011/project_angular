// Angular
import { Injectable } from '@angular/core';
// RxJS
import { mergeMap, map, tap } from 'rxjs/operators';
import { defer, Observable, of } from 'rxjs';
// NGRX
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
// Services
// Actions
import {
    AllPermissionsLoaded,
    AllPermissionsRequested,
    PermissionActionTypes
} from '../_actions/permission.actions';
// Models

import { UsersService } from '../../service/_services';

@Injectable()
export class PermissionEffects {
    // @Effect()
    // loadAllPermissions$ = this.actions$
    //     .pipe(
    //         ofType<AllPermissionsRequested>(PermissionActionTypes.AllPermissionsRequested),

    //         map((result: Permission[]) => {
    //             return new AllPermissionsLoaded({
    //                 permissions: result
    //             });
    //         })
    //     );

    @Effect()
    init$: Observable<Action> = defer(() => {
        return of(new AllPermissionsRequested());
    });

    constructor(private actions$: Actions, private userAuth: UsersService) { }
}
