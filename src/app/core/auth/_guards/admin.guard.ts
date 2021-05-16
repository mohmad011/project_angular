// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// RxJS
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
// NGRX
import { select, Store } from '@ngrx/store';
// Module reducers and selectors
import { AppState } from '../../reducers';
import { currentUserPermissions } from '../_selectors/auth.selectors';

import { find } from 'lodash';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        return this.store
            .pipe(
                select(currentUserPermissions),
                map((permissions: string[]) => {
                    const _perm = find(permissions, (elem: string) => {
                        return elem.toLocaleLowerCase() === 'admin';
                    });
                    return _perm ? true : false;
                }),
                tap(hasAccess => {
                    if (!hasAccess) {
                        this.router.navigateByUrl('/error/403');
                    }
                })
            );
    }
}
