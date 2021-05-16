// Angular
import { Component, Input, OnInit } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
// State
import { AppState } from '../../../../../core/reducers';
import { currentUser, Logout } from '../../../../../core/auth';
import { User } from '../../../../../core/service';
import { MatDialog } from '@angular/material';
import { ChangePasswordModal } from '../../modals/change-password/change-password.component';
import { AddCouponModal } from '../../modals/add-coupon/add-coupon.component';

@Component({
	selector: 'kt-user-profile',
	templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
	// Public properties
	user$: Observable<User>;

	@Input() avatar = true;
	@Input() greeting = true;
	@Input() badge: boolean;
	@Input() icon: boolean;

	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 */
	constructor(private store: Store<AppState> , public dialog: MatDialog) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.user$ = this.store.pipe(select(currentUser));
	}

	/**
	 * Log out
	 */
	logout() {
		this.store.dispatch(new Logout());
	}
	openChangePasswordModal(user): void {
		let dialogRef = this.dialog.open(ChangePasswordModal, {
		  width: '400px',
		  data :user
		});

		dialogRef.afterClosed().subscribe(result => {
		});
	  }

	  openCouponModal(user): void {
		let dialogRef = this.dialog.open(AddCouponModal, {
		  width: '400px',
		  data :user
		});

		dialogRef.afterClosed().subscribe(result => {
		});
	  }
}
