// NGRX
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
// Actions
import { PermissionActionTypes, PermissionActions } from '../_actions/permission.actions';
// Models


export interface PermissionsState extends EntityState<string> {
    _isAllPermissionsLoaded: boolean;
}

export const adapter: EntityAdapter<string> = createEntityAdapter<string>();

export const initialPermissionsState: PermissionsState = adapter.getInitialState({
    _isAllPermissionsLoaded: false
});

export function permissionsReducer(state = initialPermissionsState, action: PermissionActions): PermissionsState {
    switch (action.type) {
        case PermissionActionTypes.AllPermissionsRequested:
            return {
                ...state,
                _isAllPermissionsLoaded: false
            };
        case PermissionActionTypes.AllPermissionsLoaded:
            return adapter.addAll(action.payload.permissions, {
                ...state,
                _isAllPermissionsLoaded: true
            });
        default:
            return state;
    }
}

export const getRoleState = createFeatureSelector<PermissionsState>('permissions');

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
