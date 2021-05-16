// Angular
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// RxJS
import { filter, mergeMap, tap, withLatestFrom, switchMap, catchError, map } from 'rxjs/operators';
import { defer, Observable, of } from 'rxjs';
// NGRX
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
// Auth actions
import { AuthActionTypes, Login, Logout, Register, UserLoaded, UserRequested, UserLanguage, UserSubscription, ProfileAdminUpdated } from '../_actions/auth.actions';
import { AuthService } from '../_services/index';
import { AppState } from '../../reducers';
import { isUserLoaded } from '../_selectors/auth.selectors';
import moment from 'moment';
import { UserUpdatedSuccessfully } from '../../service';
import { UserFormResult, UsersFormErrors } from '../../service/_actions/user.actions';
import { TranslateService } from '@ngx-translate/core';
const API_TOKEN = 'authTokenKey';

@Injectable()
export class AuthEffects {
	@Effect({ dispatch: false })
	login$ = this.actions$.pipe(
		ofType<Login>(AuthActionTypes.Login),
		tap(action => {
			localStorage.setItem(API_TOKEN, JSON.stringify(action.payload));
			this.store.dispatch(new UserRequested());
		}),
	);

	@Effect({ dispatch: false })
	logout$ = this.actions$.pipe(
		ofType<Logout>(AuthActionTypes.Logout),
		switchMap(() => this.auth.logOut()),
		tap(() => {
			this.router.navigate(['/auth/login'], { queryParams: { returnUrl: this.returnUrl } });
		},
			catchError(err => {
				this.router.navigate(['/auth/login'], { queryParams: { returnUrl: this.returnUrl } });
				return (err)
			})
		)
	);

	@Effect({ dispatch: false })
	register$ = this.actions$.pipe(
		ofType<Register>(AuthActionTypes.Register),
		tap(action => {
			localStorage.setItem(API_TOKEN, JSON.stringify(action.payload));
		})
	);

	@Effect({ dispatch: false })
	loadUser$ = this.actions$
		.pipe(
			ofType<UserRequested>(AuthActionTypes.UserRequested),
			withLatestFrom(this.store.pipe(select(isUserLoaded))),
			filter(([action, _isUserLoaded]) => !_isUserLoaded),
			mergeMap(([action, _isUserLoaded]) => this.auth.getUserByToken()),
			tap(_user => {
				if (_user) {
					this.store.dispatch(new UserLoaded({ user: _user }));
					if (_user && _user.language) {
						const currentLanguage = localStorage.getItem('language');
						if (currentLanguage && _user.language !== currentLanguage) {
							localStorage.setItem('language', _user.language);
							this.store.dispatch(new UserLanguage({ language: _user.language }));
						}
					}
				} else {
					this.store.dispatch(new Logout());
				}
			})
		);
	@Effect({ dispatch: false })
	updateProfile$ = this.actions$
		.pipe(
			ofType<ProfileAdminUpdated>(AuthActionTypes.updateAdminProfile),
			mergeMap(({ payload }) => {
				return this.auth.save(payload.user)
			}),
			map((r) => {
				this.store.dispatch(new UserLoaded({ user: r }));
				this.store.dispatch(new UserUpdatedSuccessfully())
				this.store.dispatch(new UserFormResult({ result: r }));
			}),
			catchError((err) => {
				if (err.error && err.error.error && err.error.error.statusCode && (err.error.error.statusCode == 450 || err.error.error.statusCode == 423)) {
					this.store.dispatch(new UsersFormErrors({
						formErrors: {
							message: this.translate.instant('AUTH.VALIDATION.MOBILE_EXIST'),
							code: err.error.error.statusCode
						}
					}))
				} else if (err.error && err.error.error && err.error.error.statusCode && (err.error.error.statusCode == 451 || err.error.error.statusCode == 422)) {
					this.store.dispatch(new UsersFormErrors({
						formErrors: {
							message: this.translate.instant('AUTH.VALIDATION.EMAIL_EXISTED'),
							code: err.error.error.statusCode
						}
					}))
				} else {
					this.store.dispatch(new UsersFormErrors({
						formErrors: {
							message: this.translate.instant('AUTH.VALIDATION.BACKEND_ERROR'),
							code: err.error && err.error.error && err.error.error.statusCode ? err.error.error.statusCode : 404
						}
					}))
					this.store.dispatch(new UserFormResult({ error: err }))
					return of(err)
				}
				return of(err)
			})
		);

	@Effect()
	init$: Observable<Action> = defer(() => {
		const userTokenStr = localStorage.getItem(API_TOKEN);
		let observableResult = of({ type: 'NO_ACTION' });
		if (userTokenStr) {
			const userToken = JSON.parse(userTokenStr);
			observableResult = of(new Login(userToken));
		}
		return observableResult;
	});
	private returnUrl: string;
	constructor(private actions$: Actions,
		private router: Router,
		private auth: AuthService,
		private translate: TranslateService,
		private store: Store<AppState>) {

		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.returnUrl = event.url;
			}
		});
	}
}
