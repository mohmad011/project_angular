// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// RxJS
import { finalize, takeUntil, tap,catchError } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
// Translate
import { TranslateService } from '@ngx-translate/core';
// Auth
import { AuthNoticeService, AuthService } from '../../../../core/auth';

@Component({
	selector: 'kt-forgot-password',
	templateUrl: './forgot-password.component.html',
	encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
	// Public params
	forgotPasswordForm: FormGroup;
	loading = false;
	errors: any = [];

	private unsubscribe: Subject<any>; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param authService
	 * @param authNoticeService
	 * @param translate
	 * @param router
	 * @param fb
	 * @param cdr
	 */
	constructor(
		private authService: AuthService,
		public authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private router: Router,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef
	) {
		this.unsubscribe = new Subject();
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		this.authNoticeService.setNotice(null, 'danger');
		this.initRegistrationForm();
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null, 'danger');
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initRegistrationForm() {
		this.forgotPasswordForm = this.fb.group({
			email: ['', Validators.compose([
				Validators.required,
				Validators.email,
				Validators.minLength(3),
				Validators.maxLength(320) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
			])
			]
		});
	}

	/**
	 * Form Submit
	 */
	submit() {
		const controls = this.forgotPasswordForm.controls;
		this.authNoticeService.setNotice(null, 'danger');
		/** check form */
		if (this.forgotPasswordForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;

		const email = controls.email.value;
		this.authService.requestPassword(email).pipe(
			tap(response => {
				if (response) {
					this.router.navigateByUrl('/auth/reset-password');
				} else {
					this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.NOT_FOUND', {name: this.translate.instant('AUTH.INPUT.EMAIL')}), 'danger');
				}
			}),
			takeUntil(this.unsubscribe),
			finalize(() => {
				this.loading = false;
				this.cdr.markForCheck();
			}),
			catchError(err => {
				this.loading = false;
				this.cdr.markForCheck();
				if(err && err.status &&  (err.status === 400  ||err.status === 402)){
					if(err && err.error.message && err.error.message.messageAR && err.error.message.messageEn )
						if(this.translate.currentLang==='ar'){
							this.authNoticeService.setNotice( err.error.message.messageAR, 'danger');
						}else {
							this.authNoticeService.setNotice( err.error.message.messageEn, 'danger');
						}
				} else{
					this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.BACKEND_ERROR'), 'danger');
				}
				return of(null);
		})
		).subscribe();
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.forgotPasswordForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result =
			control.hasError(validationType) &&
			(control.dirty || control.touched);
		return result;
	}
}
