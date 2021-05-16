import { Action } from '@ngrx/store';
import { Admin } from '../../service';
import { Update } from '@ngrx/entity';

export enum AuthActionTypes {
    Login = '[Login] Action',
    Logout = '[Logout] Action',
    Register = '[Register] Action',
    UserRequested = '[Request User] Action',
    UserLoaded = '[Load User] Auth API',
    UserLanguage = '[set] set User Language',
    UserSubscription = '[set] User subscription',
    updateAdminProfile = '[profile ] update AdminProfile '
}

export class Login implements Action {
    readonly type = AuthActionTypes.Login;
    constructor(public payload: { id: string, userId: string, ttl: string, role: string }) { }
}
export class UserLanguage implements Action {
    readonly type = AuthActionTypes.UserLanguage;
    constructor(public payload: { language: string }) { }
}
export class Logout implements Action {
    readonly type = AuthActionTypes.Logout;
}
export class ProfileAdminUpdated implements Action {
    readonly type = AuthActionTypes.updateAdminProfile;
    constructor(public payload: {
        partialUser: Update<Admin>,
        user: Admin,
    }) { }
}

export class Register implements Action {
    readonly type = AuthActionTypes.Register;
    constructor(public payload: { id: string, userId: string, ttl: string, role: string }) { }
}


export class UserRequested implements Action {
    readonly type = AuthActionTypes.UserRequested;
}

export class UserLoaded implements Action {
    readonly type = AuthActionTypes.UserLoaded;
    constructor(public payload: { user: Admin }) { }
}

export class UserSubscription implements Action {
    readonly type = AuthActionTypes.UserSubscription;
    constructor(public payload: { subscription: any }) { }
}



export type AuthActions = Login | Logout | Register | UserRequested | UserLoaded | UserLanguage | UserSubscription | ProfileAdminUpdated;
