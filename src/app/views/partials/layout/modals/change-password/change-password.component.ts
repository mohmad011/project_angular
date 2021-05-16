// Angular
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// Layout
// Object-Path
import { LayoutConfigService } from '../../../../../core/_base/layout'
import { UsersService } from '../../../../../core/service/_services/users.service'
import { User, Admin } from '../../../../../core/service';
import { TranslateService } from '@ngx-translate/core';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../core/auth';

@Component({
	selector: 'kt-change-password-modal',
	templateUrl: './change-password.component.html',
})

export class ChangePasswordModal implements OnInit {
	user: Admin;
	messages: any;
	showProgress: boolean;
	passwordForm: FormGroup;
	validators = [Validators.required];
	GerenatedPassword: string
	passwordGenerated: boolean = false;
	passwordHidden: boolean = false;
	showPasswordValue: boolean;

	constructor(
		private layoutConfigService: LayoutConfigService,
		public dialogRef: MatDialogRef<ChangePasswordModal>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private translate: TranslateService,
		private emailFB: FormBuilder,
		private layoutUtilsService: LayoutUtilsService,
		private router : Router,
		private authService : AuthService,

	) {
		this.translate.get(['USER_MANAGEMENT.LIST.PASSWORD_UPDATED']).subscribe((res: any) => {
			this.messages = res
		})
		this.passwordForm = this.emailFB.group({
			password: [null, Validators.compose([
				Validators.required])]
		});

	}

	ngOnInit(): void {
		const config = this.layoutConfigService.getConfig();
		if (this.data && this.data.id) {
			this.authService.get( this.data.id).subscribe(res => {
				if (res) {
					this.user = res
					this.user.password = null
				}
			})
		}
	}
	onNoClick(): void {
		this.dialogRef.close();
	}
	generatePassword() {
		this.passwordForm.patchValue({
			password: Math.random().toString(36).substr(2, 7)
		});
	}
	showHidePassword() {
		this.user.password = this.passwordForm.controls.password.value;
		this.showPasswordValue = !this.showPasswordValue;
	}
	generateClicked() {
		this.passwordForm.addControl('password', new FormControl(null, this.validators));
		this.passwordGenerated = true
	}
	submit() {
		if (!this.passwordForm.invalid && this.passwordForm.controls.password.value) {
			this.user.password = this.passwordForm.controls.password.value;
			this.showProgress = true;
			this.authService.save(this.user).subscribe(
				() => {
					this.showProgress = false;
					const message = this.messages['USER_MANAGEMENT.LIST.PASSWORD_UPDATED'];
					this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, true);
					this.dialogRef.close();
					setTimeout(() => {
						this.authService.logOut().subscribe(()=>{
							this.router.navigate(['/auth/login']);
						},()=>{
							this.router.navigate(['/auth/login']);
						});
					}, 500);
				},
				(err) => {
					this.showProgress = false;
				}
			)
		}
	}
}
