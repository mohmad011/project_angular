import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { User } from '../_models/user.model';
import { QueryParamsModel } from '../../_base/crud';

export enum UserActionTypes {
    AllUsersRequested = '[Users Module] All Users Requested',
    AllUsersLoaded = '[Users API] All Users Loaded',
    UserOnServerCreated = '[Edit User Component] User On Server Created',
    UserCreated = '[Edit User Dialog] User Created',
    UserUpdated = '[Edit User Dialog] User Updated',
    UserDeleted = '[Users List Page] User Deleted',
    UsersPageRequested = '[Users List Page] Users Page Requested',
    UsersPageLoaded = '[Users API] Users Page Loaded',
    UsersPageCancelled = '[Users API] Users Page Cancelled',
    UsersPageToggleLoading = '[Users] Users Page Toggle Loading',
	UsersActionToggleLoading = '[Users] Users Action Toggle Loading',
	UsersFormErrors = '[users] Users Form Errors ' ,
	UserUpdatedSuccessfully= '[users] user Updated Successfully',
	UserFormResult ="[edit- update User] User Form Result ",
	ProfileUpdate  = "[update-profile ] Update Profile "
}

export class UserOnServerCreated implements Action {
    readonly type = UserActionTypes.UserOnServerCreated;
    constructor(public payload: { user: User }) { }
}

export class UserCreated implements Action {
    readonly type = UserActionTypes.UserCreated;
    constructor(public payload: { user: User }) { }
}


export class UserUpdated implements Action {
    readonly type = UserActionTypes.UserUpdated;
    constructor(public payload: {
        partialUser: Update<User>,
        user: User
    }) { }
}

export class ProfileUpdated implements Action {
    readonly type = UserActionTypes.ProfileUpdate;
    constructor(public payload: {
        partialUser: Update<User>,
		user: User ,
    }) { }
}

export class UserDeleted implements Action {
    readonly type = UserActionTypes.UserDeleted;
    constructor(public payload: { id: any }) {}
}

export class UsersPageRequested implements Action {
    readonly type = UserActionTypes.UsersPageRequested;
    constructor(public payload: { page: QueryParamsModel }) { }
}

export class UsersPageLoaded implements Action {
    readonly type = UserActionTypes.UsersPageLoaded;
    constructor(public payload: { users: User[], totalCount: number, page: QueryParamsModel  }) { }
}


export class UsersPageCancelled implements Action {
    readonly type = UserActionTypes.UsersPageCancelled;
}

export class UsersPageToggleLoading implements Action {
    readonly type = UserActionTypes.UsersPageToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export class UsersActionToggleLoading implements Action {
    readonly type = UserActionTypes.UsersActionToggleLoading;
    constructor(public payload: { isLoading: boolean }) { }
}

export class UsersFormErrors implements Action {
    readonly type = UserActionTypes.UsersFormErrors;
    constructor(public payload: { formErrors: any}) { }
}
export class UserFormResult implements Action {
    readonly type = UserActionTypes.UserFormResult;
    constructor(public payload: { result? : any  , error? : String}) { }
}
export class UserUpdatedSuccessfully implements Action {
    readonly type = UserActionTypes.UserUpdatedSuccessfully;
    constructor() { }
}

export type UserActions = UserCreated
| UserUpdated
| UserDeleted
| UserOnServerCreated
| UsersPageLoaded
| UsersPageCancelled
| UsersPageToggleLoading
| UsersPageRequested
| UserFormResult
| UsersActionToggleLoading
| UsersFormErrors
| UserUpdatedSuccessfully
| ProfileUpdated;
