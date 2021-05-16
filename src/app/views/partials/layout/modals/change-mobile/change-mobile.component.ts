// Angular
import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// Layout
// Object-Path
import { LayoutConfigService } from '../../../../../core/_base/layout'
import { UsersService } from '../../../../../core/service/_services/users.service'
import { User, Admin } from '../../../../../core/service';
import { TranslateService } from '@ngx-translate/core';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProfilesServices } from '../../../../../core/service/_services';
import { AuthService } from '../../../../../core/auth';

@Component({
	selector: 'kt-change-mobile-modal',
	templateUrl: './change-mobile.component.html',
})

export class ChangeMobileModal implements OnInit {
	user: Admin;
	submitted: boolean;
	mobileExist: boolean;
	messages: any;
	showProgress: boolean;
	mobileForm: FormGroup;
	validators = [ Validators.required];

	constructor(
		private layoutConfigService: LayoutConfigService,
		public dialogRef: MatDialogRef<ChangeMobileModal>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private translate: TranslateService,
		private userAuth: AuthService,
		private mobileFB: FormBuilder,
		private layoutUtilsService: LayoutUtilsService,
		private profileServic : ProfilesServices
	) {
		this.translate.get(['USER_MANAGEMENT.LIST.MOBILE_UPDATED']).subscribe((res: any) => {
			this.messages = res
		})

	}

	ngOnInit(): void {
		const config = this.layoutConfigService.getConfig();
		this.mobileForm = this.mobileFB.group({
			mobile: [null, Validators.compose([
				Validators.required])]
		});
		if (this.data && this.data.id) {
			this.userAuth.get(this.data.id).subscribe(res => {
				if (res) {
					this.user = res
					this.mobileForm.controls['mobile'].patchValue(this.user.mobile)
				}
			})
		}
	}
	onNoClick(): void {
		this.dialogRef.close();
	}

	submit() {
		this.submitted = true;
		this.mobileExist = false;
		if (!this.mobileForm.invalid && this.mobileForm.controls.mobile.value ) {
			this.user.mobile= this.mobileForm.controls.mobile.value ;
			this.showProgress = true;
			this.userAuth.save({id: this.user.id, mobile :this.user.mobile} ).subscribe(
				(res) => {
					this.showProgress = false;
					const message = this.messages['USER_MANAGEMENT.LIST.MOBILE_UPDATED'];
					this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, true);
					this.dialogRef.close({data : res});
				},
				(err) => {
					this.showProgress = false;
					if (err && err.status && err.status == 450 ||
						(err.error && err.error.error && err.error.error.statusCode && err.error.error.statusCode == 450)) {
						this.mobileExist = true;
						this.mobileForm.controls.mobile.setErrors({invalid : true});

					}
				}
			)
		}
	}
}
