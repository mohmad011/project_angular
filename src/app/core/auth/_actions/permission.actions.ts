// NGRX
import { Action } from '@ngrx/store';
// Models


export enum PermissionActionTypes {
    AllPermissionsRequested = '[Init] All Permissions Requested',
    AllPermissionsLoaded = '[Init] All Permissions Loaded'
}

export class AllPermissionsRequested implements Action {
    readonly type = PermissionActionTypes.AllPermissionsRequested;
}

export class AllPermissionsLoaded implements Action {
    readonly type = PermissionActionTypes.AllPermissionsLoaded;
    constructor(public payload: { permissions: string[] }) { }
}

export type PermissionActions = AllPermissionsRequested | AllPermissionsLoaded;
