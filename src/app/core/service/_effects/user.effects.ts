import { UserFormResult } from './../_actions/user.actions';
// Angular
import { Injectable } from '@angular/core';
// RxJS
import { mergeMap, map, tap, catchError, switchMap } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
// NGRX
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
// CRUD
import { QueryParamsModel } from '../../_base/crud';
// Services
// State
import { AppState } from '../../../core/reducers';
import {
	UserActionTypes,
	UsersPageRequested,
	UsersPageLoaded,
	UserCreated,
	UserDeleted,
	UserUpdated,
	UserOnServerCreated,
	UsersActionToggleLoading,
	UsersPageToggleLoading,
	UsersFormErrors,
	UserUpdatedSuccessfully,
	ProfileUpdated
} from '../_actions/user.actions';
import { ProfilesServices } from '../_services';
import { TranslateService } from '@ngx-translate/core';
import { UserLoaded } from '../../auth/_actions/auth.actions';

@Injectable()
export class UserEffects {
	showPageLoadingDistpatcher = new UsersPageToggleLoading({ isLoading: true });
	hidePageLoadingDistpatcher = new UsersPageToggleLoading({ isLoading: false });

	showActionLoadingDistpatcher = new UsersActionToggleLoading({ isLoading: true });
	hideActionLoadingDistpatcher = new UsersActionToggleLoading({ isLoading: false });

	@Effect()
	loadUsersPage$ = this.actions$
		.pipe(
			ofType<UsersPageRequested>(UserActionTypes.UsersPageRequested),
			mergeMap(({ payload }) => {
				this.store.dispatch(this.showPageLoadingDistpatcher);
				const filter = { where: payload.page.filter.where, offset: payload.page.offset, limit: payload.page.limit, include: payload.page.filter.include }
				const requestToServer = this.userAuth.queryByObject(filter);
				const requestToServerCount = this.userAuth.countByObject(filter.where);
				const lastQuery = of(payload.page);
				return forkJoin(requestToServer, lastQuery, requestToServerCount);
			}),
			map(response => {
				const result = response[0];
				const count = response[2];
				const lastQuery: QueryParamsModel = response[1];
				return new UsersPageLoaded({
					users: result,
					totalCount: count.count,
					page: lastQuery
				});
			}),
		);

	@Effect()
	deleteUser$ = this.actions$
		.pipe(
			ofType<UserDeleted>(UserActionTypes.UserDeleted),
			mergeMap(({ payload }) => {
				this.store.dispatch(this.showActionLoadingDistpatcher);
				return this.userAuth.destroy(payload.id);
			}
			),
			map(() => {
				return this.hideActionLoadingDistpatcher;
			}),
		);

	@Effect()
	updateUser$ = this.actions$
		.pipe(
			ofType<UserUpdated>(UserActionTypes.UserUpdated),
			mergeMap(({ payload }) => {
				this.store.dispatch(this.showActionLoadingDistpatcher);
				return this.userAuth.updateUser(payload.user)
			}),
			map((r) => {
				this.store.dispatch(new UserUpdatedSuccessfully())
				this.store.dispatch(this.hideActionLoadingDistpatcher);
				this.store.dispatch(new UserFormResult({ result: r }))
			}),
			catchError((err) => {
				this.store.dispatch(this.hideActionLoadingDistpatcher);
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
			}),
			map(() => {
				return this.hideActionLoadingDistpatcher;
			}),
		);

	@Effect()
	updateProfile$ = this.actions$
		.pipe(
			ofType<ProfileUpdated>(UserActionTypes.ProfileUpdate),
			mergeMap(({ payload }) => {
				this.store.dispatch(this.showActionLoadingDistpatcher);

				return this.userAuth.updateUser(payload.user)
			}),
			map((r) => {
				if (this.userAuth.currentUserId === r.id) {
					this.store.dispatch(new UserLoaded({ user: r }));
				}
				this.store.dispatch(new UserUpdatedSuccessfully())
				this.store.dispatch(this.hideActionLoadingDistpatcher);
				this.store.dispatch(new UserFormResult({ result: r }));
			}),
			catchError((err) => {
				this.store.dispatch(this.hideActionLoadingDistpatcher);
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
			}),
			map(() => {
				return this.hideActionLoadingDistpatcher;
			}),
		);

	@Effect()
	createUser$ = this.actions$
		.pipe(
			ofType<UserOnServerCreated>(UserActionTypes.UserOnServerCreated),
			mergeMap(({ payload }) => {
				this.store.dispatch(this.showActionLoadingDistpatcher);
				return this.userAuth.createUser(payload.user).pipe(
					tap(res => {
						this.store.dispatch(new UserCreated({ user: res }));
					}),
					catchError((err) => {
						this.store.dispatch(this.hideActionLoadingDistpatcher);
						if (err.error && (
							err.error && err.error.statusCode == 450
							|| (err.error.error && err.error.error.statusCode && err.error.error.statusCode == 450))) {
							this.store.dispatch(new UsersFormErrors({
								formErrors: {
									message: this.translate.instant('AUTH.VALIDATION.MOBILE_EXIST'),
									code: err.error.statusCode ? err.error.statusCode : err.error.error.statusCode
								}
							}))
						} else if (err.error && (
							err.error && (err.error.statusCode == 451 || err.error.statusCode == 422)
							|| (err.error.error && err.error.error.statusCode &&
								(err.error.error.statusCode == 451 || err.error.error.statusCode == 422)))) {
							this.store.dispatch(new UsersFormErrors({
								formErrors: {
									message: this.translate.instant('AUTH.VALIDATION.EMAIL_EXISTED'),
									code: err.error.statusCode ? err.error.statusCode : err.error.error.statusCode
								}
							}))
						} else {
							this.store.dispatch(new UsersFormErrors({
								formErrors: {
									message: this.translate.instant('AUTH.VALIDATION.BACKEND_ERROR'),
									code: err.error && err.error.error && err.error.error.statusCode ? err.error.error.statusCode : 404
								}
							}))
						}
						return of(err)
					})
				);
			}),
			map(() => {
				return this.hideActionLoadingDistpatcher;
			})
		);

	constructor(private actions$: Actions,
		private userAuth: ProfilesServices,
		private translate: TranslateService,
		private store: Store<AppState>) {
	}

}
