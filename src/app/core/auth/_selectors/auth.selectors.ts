// NGRX
import { createSelector } from '@ngrx/store';
// Lodash
import { each, find, some } from 'lodash';
// Selectors

import { selectAllPermissions } from './permission.selectors';
// Models
import { compact } from 'lodash'

export const selectAuthState = state => state.auth;


export const authToken = createSelector(
	selectAuthState,
	auth => auth
);
export const isLoggedIn = createSelector(
	selectAuthState,
	auth => auth.loggedIn
);

export const isLoggedOut = createSelector(
	isLoggedIn,
	loggedIn => !loggedIn
);


export const currentAuthToken = createSelector(
	selectAuthState,
	auth => auth.id
);

export const isUserLoaded = createSelector(
	selectAuthState,
	auth => auth.isUserLoaded
);

export const subState = createSelector(
	selectAuthState,
	auth => auth.subState
);
export const userSubscription = createSelector(
	selectAuthState,
	auth => auth.subscriptionObj
);
export const currentUser = createSelector(
	selectAuthState,
	auth => auth.user
);
export const userLanguage = createSelector(
	selectAuthState,
	auth => auth.language
);
export const userType = createSelector(
	selectAuthState,
	auth => auth.typ
)
export const currentUserRoleIds = createSelector(
	currentUser,
	user => {
		if (!user) {
			return [];
		}
		return user.roles;
	}
);



export const checkHasUserPermission = (per: string) => createSelector(
	selectAuthState,
	(user) => {
		return [user.role, ...user.events].indexOf(per) > -1
	}
);

export const currentUserPermissions = createSelector(
	selectAuthState,
	(user) => {
		return compact([user.role, ...user.events]);
	}
);


