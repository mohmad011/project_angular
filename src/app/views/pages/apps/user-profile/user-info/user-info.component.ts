import { ofType } from "@ngrx/effects";
import {
	Component,
	OnInit,
	OnDestroy,
	NgZone,
	ChangeDetectorRef,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
	FormBuilder,
	FormGroup,
	Validators,
	FormControl,
} from "@angular/forms";
import { BehaviorSubject, Observable, of, Subscription } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { Store, select, ActionsSubject } from "@ngrx/store";
import { Update } from "@ngrx/entity";

import {
	UserActionTypes,
	ProfileUpdated,
} from "../../../../../core/service/_actions/user.actions";
import { AppState } from "../../../../../core/reducers";
import {
	LayoutUtilsService,
	MessageType,
} from "../../../../../core/_base/crud";

import { AuthService } from "../../../../../core/auth/_services";
import { ProfilesServices } from "../../../../../core/service/_services/profiles.service";
import {
	selectUsersActionLoading,
	Admin,
} from "../../../../../core/service";
import { MatDialog } from "@angular/material";
import { ChangeEmailModal } from "../../../../partials/layout/modals/change-email/change-email.component";
import { ChangeMobileModal } from "../../../../partials/layout/modals/change-mobile/change-mobile.component";
import { ProfileAdminUpdated } from "../../../../../core/auth";

@Component({
	selector: "kt-user-info",
	templateUrl: "./user-info.component.html",
})
export class UserInfoComponent implements OnInit, OnDestroy {
	user: any;
	userId$: Observable<number>;
	oldUser: Admin;
	messages: any;
	loading$: Observable<boolean>;
	rolesSubject = new BehaviorSubject<number[]>([]);
	userForm: FormGroup;
	hasFormErrors = false;
	GerenatedPassword: string;
	passwordGenerated: boolean = false;
	passwordHidden: boolean = false;
	passwordDisplayed: boolean = false;
	private subscriptions: Subscription[] = [];
	validators = [Validators.required];
	cities: any;
	countries: any;
	currentUser: any;
	selectedTab = 0;
	isFileUploading: boolean;

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private userFB: FormBuilder,
		private authServices: AuthService,
		private layoutUtilsService: LayoutUtilsService,
		private store: Store<AppState>,
		private actionsSbj: ActionsSubject,
		private translate: TranslateService,
		public dialog: MatDialog,
		private ngZone: NgZone,
		private changeDetectorRef: ChangeDetectorRef
	) {
		this.initForm();
		translate
			.get(["AUTH.INPUT.PROFILE", "USER_MANAGEMENT.LIST.USER_SAVED"])
			.subscribe((res: any) => {
				this.messages = res;
			});
	}

	ngOnInit() {
		this.loading$ = this.store.pipe(select(selectUsersActionLoading));
		const updateResSubScb = this.actionsSbj
			.pipe(ofType(UserActionTypes.UserFormResult))
			.subscribe((action: any) => {
				if (action.payload && action.payload.result) {
					const message = this.messages[
						"USER_MANAGEMENT.LIST.USER_SAVED"
					];
					this.layoutUtilsService.showActionNotification(
						message,
						MessageType.Update,
						3000,
						true,
						true
					);
					this.goBackWithId();
				} else {
					// this.noticeService.setNotice(
					// 	this.translate.instant("AUTH.VALIDATION.BACKEND_ERROR"),
					// 	"danger"
					// );
				}
			});
		this.subscriptions.push(updateResSubScb);

		this.authServices.me().subscribe((res) => {
			this.user = res;
			if (!!this.user) {
				this.createForm();
				this.userForm.controls["email"].disable();
				this.userForm.controls["mobile"].disable();
			}
		});
	}

	generatePassword() {
		this.userForm.patchValue({
			password: Math.random().toString(36).substr(2, 7),
		});
	}
	showPassword() {
		this.user.password = this.userForm.controls.password.value;
		this.passwordDisplayed = true;
	}
	hidePassword() {
		this.user.password = this.userForm.controls.password.value;
		this.passwordDisplayed = false;
		this.passwordHidden = true;
	}
	generateClicked() {
		this.userForm.addControl(
			"password",
			new FormControl(null, this.validators)
		);
		this.passwordGenerated = true;
	}
	initForm() {
		this.userForm = this.userFB.group({
			avatar: [null],
			firstName: [null, Validators.required],
			lastName: [null, Validators.required],
			email: [
				null,
				Validators.compose([Validators.required, Validators.email]),
			],
			mobile: [null],
			dateOfBirth: [null],
			password: [null, Validators.required],
		});
	}
	createForm() {
		if (!!this.user) {
			this.userForm.removeControl("password");
			this.userForm.patchValue({
				avatar: this.user.avatar,
				firstName: this.user.firstName,
				lastName: this.user.lastName,
				email: this.user.email,
				mobile: this.user.mobile,
				dateOfBirth: this.user.dateOfBirth,
			});
		}
	}

	goBackWithId() {
		this.router.navigateByUrl("/");
	}
	refreshUser(isNew: boolean = false, id = 0) {
		let url = this.router.url;
		if (!isNew) {
			this.router.navigate([url], { relativeTo: this.activatedRoute });
			return;
		}
		url = `/user-profile`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}
	onSumbit(withBack: boolean = false) {
		this.hasFormErrors = false;
		const controls = this.userForm.controls;

		if (this.userForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			this.hasFormErrors = true;
			return;
		}

		const editedUser = this.prepareUser();
		this.updateUser(editedUser, (withBack = true));
	}

	prepareUser(): any {
		const userTokenStr = localStorage.getItem("authTokenKey");
		const userToken = JSON.parse(userTokenStr);
		const controls = this.userForm.controls;
		const _user: any = {
			accessToken: !!this.user ? this.user.accessToken : null,
			avatar: !!this.user ? this.user.avatar : null,
			id: !!this.user ? this.user.id : null,
			firstName: controls.firstName.value,
			lastName: controls.lastName.value,
			dateOfBirth: controls.dateOfBirth.value,
			mobile: controls.mobile.value,
			email: controls.email.value,
		};
		return _user;
	}

	updateUser(_user: Admin, withBack: boolean = false) {
		const updatedUser: Update<Admin> = {
			id: _user.id,
			changes: _user,
		};
		this.store.dispatch(
			new ProfileAdminUpdated({ partialUser: updatedUser, user: _user })
		);
	}

	getComponentTitle() {
		let result = this.messages["AUTH.INPUT.PROFILE"];
		return result;
	}

	onAlertClose($event) {
		this.hasFormErrors = false;
	}
	openChangeEmailModal(): void {
		let dialogRef = this.dialog.open(ChangeEmailModal, {
			width: "400px",
			data: this.user,
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.authServices.logOut().subscribe(() => { });
				this.router.navigate(["/auth/login"]);
			}
		});
	}
	openChangeMobileModal(): void {
		let dialogRef = this.dialog.open(ChangeMobileModal, {
			width: "400px",
			data: this.user,
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.authServices.logOut().subscribe(() => { });
				this.router.navigate(["/auth/login"]);
			}
		});
	}

	onFileChange(event: any) {
		let fileList: FileList = event.target.files;
		if (fileList.length > 0) {
			this.isFileUploading = true;
			let file: File = fileList[0];
			this.authServices.upload(file).subscribe(
				(image) => {
					this.ngZone.run(() => {
						this.user.avatar = image["path"];
						this.isFileUploading = false;
						this.changeDetectorRef.markForCheck();
					});
				},
				(error) => {
					console.error(error);
					this.ngZone.run(() => {
						this.isFileUploading = false;
						this.changeDetectorRef.markForCheck();
					});
				}
			);
		}
	}

	ngOnDestroy() {
		// this.noticeService.setNotice(null, "danger");
		this.subscriptions.forEach((sb) => sb.unsubscribe());
	}
}
