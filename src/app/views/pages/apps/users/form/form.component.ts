import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AppState } from '../../../../../core/reducers';
import { SubheaderService } from '../../../../../core/_base/layout';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';
import { ProfilesServices, UsersService } from '../../../../../core/service/_services';
import { User, selectUsersActionLoading, UserUpdated, selectUserFormErrorMessages } from '../../../../../core/service';

import { ActionsSubject } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { UserActionTypes } from '../../../../../core/service/_actions/user.actions';
import { ChangeEmailModal } from '../../../../partials/layout/modals/change-email/change-email.component';
import { MatDialog } from '@angular/material';

@Component({
	selector: 'kt-users-form',
	templateUrl: './form.component.html',
})
export class UserFormComponent implements OnInit, OnDestroy {
	user: any;
	userId$: Observable<number>;
	oldUser: User;
	messages: any;
	loading$: Observable<boolean>;
	noInterests = false;
	rolesSubject = new BehaviorSubject<number[]>([]);

	userForm: FormGroup;
	hasFormErrors = false;
	interestsOptions: any;
	interests = [];
	GerenatedPassword: string;
	passwordGenerated = false;
	passwordDisplayed = false;
	private subscriptions: Subscription[] = [];
	validators = [Validators.required];
	userEmailExisted = false;
	meetingColumns = ['title', 'description', 'datetime', 'duration'];
	invitationColumns = ['title', 'status'];
	uploadedPicture: any;


	constructor(private activatedRoute: ActivatedRoute,
		private actionsSbj: ActionsSubject,
		private router: Router,
		private userFB: FormBuilder,
		private userAuth: ProfilesServices,
		private usersApi: UsersService,
		private subheaderService: SubheaderService,
		private layoutUtilsService: LayoutUtilsService,
		private store: Store<AppState>,
		private translate: TranslateService,
		public dialog: MatDialog) {
		this.initForm();
		this.loadTranslation();
		translate.onLangChange.subscribe(() => {
			this.loadTranslation();
		});
		this.interestsOptions = {
			display: 'name',
			multiple: true
		};

	}

	private loadTranslation() {
		this.translate.get(['USER_MANAGEMENT.LIST.USER_SAVED', 'USER_MANAGEMENT.LIST.NEW_USER_SAVED',
			'USER_MANAGEMENT.LIST.CREATE_USER', 'USER_MANAGEMENT.LIST.EDIT_USER', 'USER_MANAGEMENT.LIST.USER_MANAGEMENT',
			'USER_MANAGEMENT.LIST.USERS', 'USER_MANAGEMENT.LIST.USERS_LIST']).subscribe((res: any) => {
				this.messages = res;
			});
	}

	ngOnInit() {

		this.loading$ = this.store.pipe(select(selectUsersActionLoading));
		const errorSub = this.store.pipe(select(selectUserFormErrorMessages)).subscribe(formError => {
			this.userEmailExisted = false;
			if (formError) {
				if (formError.code && (formError.code === 451 || formError.code === 422)) {
					this.userForm.controls.email.setErrors({ invalid: true });
					this.userEmailExisted = true;
				}

			} else {
			}
		});
		this.subscriptions.push(errorSub);
		const routeSubscription = this.activatedRoute.params.subscribe(params => {
			const id = params.id;
			if (id) {
				this.usersApi.findUser(id).subscribe(res => {
					if (res) {
						this.user = res;
						this.user = { ...this.user, blocked: this.user.user && this.user.user.blocked };
						this.user.password = null;
						this.initUser();
					}
				});
				// this.userForm.get("type").disable()
			}
		});
		this.subscriptions.push(routeSubscription);
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}
	generatePassword() {
		this.passwordDisplayed = true;
		this.userForm.patchValue({
			password: Math.random().toString(36).substr(2, 7)
		});
	}
	showPassword() {
		this.passwordDisplayed = !this.passwordDisplayed;
	}
	generateClicked() {
		this.userForm.addControl('password', new FormControl(null, this.validators));
		this.passwordGenerated = true;
	}

	initUser() {
		this.createForm();
		this.subheaderService.setTitle(this.messages['USER_MANAGEMENT.LIST.EDIT_USER']);
		this.subheaderService.setBreadcrumbs([

			{ title: this.messages['USER_MANAGEMENT.LIST.USERS'], page: `users` },
			{ title: this.messages['USER_MANAGEMENT.LIST.EDIT_USER'], page: `users/edit`, queryParams: { id: this.user.id } }
		]);
		this.userForm.controls.email.disable();
	}

	initForm() {
		this.userForm = this.userFB.group({
			name: [null, Validators.required],
			email: [null, Validators.compose([
				Validators.required,
				Validators.email])],
			role: [null, Validators.required],
			password: [null, Validators.required]
		});
	}

	byId(x, y) {
		return x && y && x.id === y.id;
	}

	createForm() {
		if (!!this.user) {
			this.userForm.removeControl('password');
		}

		this.userForm.patchValue({
			name: this.user.name,
			email: this.user.email,
			role: this.user.role
		});
	}

	goBackWithId() {
		const url = `/users`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

	refreshUser(isNew: boolean = false, id = 0) {
		let url = this.router.url;
		if (!isNew) {
			this.router.navigate([url], { relativeTo: this.activatedRoute });
			return;
		}

		url = `/users/edit/${id}`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

	reset() {
		this.user = Object.assign({}, this.oldUser);
		this.createForm();
		this.hasFormErrors = false;
		this.userForm.markAsPristine();
		this.userForm.markAsUntouched();
		this.userForm.updateValueAndValidity();
	}

	onSubmit(withBack: boolean = false) {
		this.hasFormErrors = false;
		this.userEmailExisted = false;
		const controls = this.userForm.controls;
		if (this.userForm.invalid) {
			Object.keys(controls).forEach(controlName => {
				controls[controlName].markAsTouched();
				console.log(controlName, controls[controlName].errors);
			});
			this.hasFormErrors = true;
			return;
		}

		const editedUser = this.prepareUser();
		this.usersApi.save(editedUser).subscribe(() => {
			this.router.navigate(['/users']).then();
		});

		// if (!!editedUser.id) {
		// 	this.updateUser(editedUser, withBack = true);
		// 	return;
		// }
		// this.addUser(editedUser, withBack = true);
	}

	prepareUser(): User {
		const controls = this.userForm.controls;
		const user = new User();

		if (this.user) {
			user.id = this.user.id
		}
		user.name = controls.name.value;
		user.email = controls.email.value;
		user.role = controls.role.value;
		if (!this.passwordGenerated && !!this.user) {
			this.userForm.addControl('password', new FormControl(this.user.password));
			user.password = this.user.password;
		} else {
			user.password = controls.password.value;
		}
		return user;
	}

	// addUser(user: User, withBack) {
	// 	this.profileApi.createUser(user).subscribe(() => {
	// 		const message = this.messages['USER_MANAGEMENT.LIST.NEW_USER_SAVED'];
	// 		this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, true);
	// 		this.router.navigate(['/users']).then();
	// 	},
	// 		error => {
	// 			if (error.error.statusCode === 451) {
	// 				this.userForm.controls['email'].setErrors({ incorrect: true });
	// 				this.hasFormErrors = true;
	// 				this.userEmailExisted = true;
	// 			}
	// 		});
	// }

	// async updateUser(user: User, withBack: boolean = false) {
	// 	const updatedUser: Update<User> = {
	// 		id: user.id,
	// 		changes: user
	// 	};
	// 	if (this.user.user && this.user.user.blocked !== this.userForm.controls.blocked.value) {
	// 		try {
	// 			await this.authApi.save({ id: this.user.user.id, blocked: this.userForm.controls.blocked.value }).toPromise();
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}
	// 	this.store.dispatch(new UserUpdated({ partialUser: updatedUser, user }));
	// 	const updateResSubScb = this.actionsSbj.pipe(
	// 		ofType(UserActionTypes.UserUpdatedSuccessfully)
	// 	).subscribe(() => {
	// 		const message = this.messages['USER_MANAGEMENT.LIST.USER_SAVED'];
	// 		this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, true);
	// 		if (!!withBack) {
	// 			this.goBackWithId();
	// 		} else {
	// 			this.refreshUser(false);
	// 		}
	// 	});
	// 	this.subscriptions.push(updateResSubScb);
	// }

	getComponentTitle() {
		let result = this.messages['USER_MANAGEMENT.LIST.CREATE_USER'];
		if (!this.user || !this.user.id) {
			return result;
		}

		result = this.messages['USER_MANAGEMENT.LIST.EDIT_USER'] - this.user.name;
		return result;
	}

	onAlertClose($event) {
		this.hasFormErrors = false;
	}
	openChangeEmailModal(): void {
		const emailDialog = this.dialog.open(ChangeEmailModal, {
			width: '400px',
			data: this.user
		});

		emailDialog.afterClosed().subscribe(result => {
			if (result && result.res && result.res.email) {
				this.userForm.patchValue({
					email: result.res.email
				});
				this.user.email = result.res.email;
			}
		});
	}

	interestsChanged() {
		if (this.interests && this.interests.length > 0) {
			this.noInterests = false;
		}
	}

}

