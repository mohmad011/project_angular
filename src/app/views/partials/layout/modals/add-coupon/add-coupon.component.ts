// Angular
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// Layout
// Object-Path
import { LayoutConfigService } from '../../../../../core/_base/layout'
import { UsersService } from '../../../../../core/service/_services/users.service'
import { User } from '../../../../../core/service';
import { TranslateService } from '@ngx-translate/core';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
	selector: 'kt-add-coupon-modal',
	templateUrl: './add-coupon.component.html',
})

export class AddCouponModal implements OnInit {
	user: User;
	messages: any;
	hasFormErrors: boolean = false;
	showProgress: boolean;
	couponForm: FormGroup;
	errorMsg: boolean = false
	errorMsg2: boolean = false
	successMsg: boolean = false
	validators = [Validators.required]; e;

	constructor(
		private layoutConfigService: LayoutConfigService,
		public dialogRef: MatDialogRef<AddCouponModal>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private translate: TranslateService,
		private userAuth: UsersService,
		private couponFB: FormBuilder,
		private layoutUtilsService: LayoutUtilsService

	) {
		this.translate.get(['USER_MANAGEMENT.LIST.COUPON_ADDED']).subscribe((res: any) => {
			this.messages = res
		})
		this.couponForm = this.couponFB.group({
			coupon: [null, Validators.compose([
				Validators.required])]
		});

	}

	ngOnInit(): void {
		const config = this.layoutConfigService.getConfig();
	}
	onNoClick(): void {
		this.dialogRef.close();
	}
	submit() {
		this.hasFormErrors = false;
		if (this.couponForm.invalid) {
			this.hasFormErrors = true;
		} else {
			this.userAuth.sendCoupon(this.couponForm.controls.coupon.value).subscribe(
				() => {
					this.showProgress = false;
					this.successMsg = true
					const message = this.messages['USER_MANAGEMENT.LIST.COUPON_ADDED'];
					this.layoutUtilsService.showActionNotification(message, MessageType.Update, 4000, true, true);
					setTimeout(() => {
						this.dialogRef.close();

					}, 4000);
				},
				(err) => {
					if (err.status == 400) {
						this.errorMsg = true
						this.errorMsg2 = false
					}
					else if (err.status == 450) {
						this.errorMsg2 = true
						this.errorMsg = false
					}
				}
			)
		}
	}
}
