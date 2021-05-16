// Angular
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// Layout
// Object-Path
import { LayoutConfigService } from '../../../../../core/_base/layout';
import { UsersService } from '../../../../../core/service/_services';
import { TranslateService } from '@ngx-translate/core';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from './../../../../../core/auth';

@Component({
	selector: 'kt-change-email-modal',
	templateUrl: './change-email.component.html',
})

export class ChangeEmailModal implements OnInit {
	submitted: boolean;
	emailExist: boolean;
	messages: any;
	showProgress: boolean;
	emailForm: FormGroup;
	validators = [ Validators.required];

	constructor(
		private layoutConfigService: LayoutConfigService,
		public dialogRef: MatDialogRef<ChangeEmailModal>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private translate: TranslateService,
		private userAuth: AuthService,
		private emailFB: FormBuilder,
		private layoutUtilsService: LayoutUtilsService,
		private userApi: UsersService
	) {
		this.translate.get(['USER_MANAGEMENT.LIST.EMAIL_UPDATED']).subscribe((res: any) => {
			this.messages = res
		})

	}

	ngOnInit(): void {
		const config = this.layoutConfigService.getConfig();
			this.emailForm = this.emailFB.group({
				email: [null, Validators.compose([
					Validators.required,
					Validators.email])]
			});
	}
	onNoClick(): void {
		this.dialogRef.close();
	}

	submit() {
		this.submitted = true;
		this.emailExist = false;
		if (!this.emailForm.invalid && this.emailForm.controls.email.value ) {
			this.showProgress = true;
			this.userApi.changeEmail(this.data.id , this.emailForm.controls['email'].value).subscribe(
				(res) => {
					this.showProgress = false;
					const message = this.messages['USER_MANAGEMENT.LIST.EMAIL_UPDATED'];
					this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, true);
					this.dialogRef.close({res});
				},
				(err) => {
					this.showProgress = false;
					if (err && err.status && err.status === 451 ||
						(err.error && err.error.error && err.error.error.statusCode && (err.error.error.statusCode == 451 || err.error.error.statusCode == 422 ))) {
						this.emailExist = true;
						this.emailForm.controls.email.setErrors({invalid : true});
					}
				}
			)
		}
	}
}
