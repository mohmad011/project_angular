// Actions
import { AuthActions, AuthActionTypes } from '../_actions/auth.actions';
import { User, Admin } from '../../service';

export interface AuthState {
	loggedIn: boolean;
	id: string;
	userId: string;
	ttl: string;
	role: string;
	user: Admin;
	isUserLoaded: boolean;
	language: string;
	subState: string;
	subscriptionObj: any
}

export const initialAuthState: AuthState = {
	loggedIn: false,
	id: undefined,
	user: undefined,
	isUserLoaded: false,
	userId: undefined,
	ttl: undefined,
	role: undefined,
	language: undefined,
	subState: '00',
	subscriptionObj: undefined
};

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
	switch (action.type) {
		case AuthActionTypes.Login: {
			const _token: string = action.payload.id;
			const _userId: string = action.payload.userId;
			const _ttl: string = action.payload.ttl;
			const _role: string = action.payload.role;
			return {
				loggedIn: true,
				id: _token,
				userId: _userId,
				ttl: _ttl,
				role: _role,
				user: undefined,
				isUserLoaded: false,
				language: undefined,
				subState: '00',
				subscriptionObj: {
					subState: '00',
				}
			};
		}

		case AuthActionTypes.Register: {
			const _token: string = action.payload.id;
			const _userId: string = action.payload.userId;
			const _ttl: string = action.payload.ttl;
			const _role: string = action.payload.role;
			return {
				...state,
				loggedIn: true,
				id: _token,
				userId: _userId,
				ttl: _ttl,
				role: _role,
				user: undefined,
				isUserLoaded: false,
				language: undefined,
				subState: '00',
				subscriptionObj: {
					subState: '00',
				}
			};
		}

		case AuthActionTypes.Logout:
			return initialAuthState;

		case AuthActionTypes.UserLoaded: {
			const _user: Admin = action.payload.user;

			return {
				...state,
				user: _user,
				isUserLoaded: true,

			};
		}
		case AuthActionTypes.UserLanguage: {
			return {
				...state,
				language: action.payload.language,
			};
		}
		case AuthActionTypes.UserSubscription: {
			return {
				...state,
				subscriptionObj: action.payload.subscription,
				subState: action.payload.subscription.state
			};
		}

		default:
			return state;
	}
}
