import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
import { finalize, takeUntil, tap, catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
import { AuthNoticeService, AuthService, Login } from '../../../../core/auth';
import { ConfirmPasswordValidator } from '../register/confirm-password.validator';

const DEMO_PARAMS = {
	CODE:'',
	CONFIRMPASSWORD: '',
	PASSWORD: ''
};

@Component({
	selector: 'kt-resetPassword',
	templateUrl: './reset-password.component.html',
	encapsulation: ViewEncapsulation.None
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
	resetForm: FormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];

	private unsubscribe: Subject<any>;

	private returnUrl: any;

	constructor(
		private router: Router,
		private auth: AuthService,
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute
	) {
		this.unsubscribe = new Subject();
	}

	ngOnInit(): void {
		this.initLoginForm();
		this.authNoticeService.setNotice(null, 'danger');
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params.returnUrl || '/';
		});
	}

	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null, 'danger');
		this.authNoticeService.setNotice(null);
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	initLoginForm() {


		this.resetForm = this.fb.group({
			code: [DEMO_PARAMS.CODE, Validators.compose([
				Validators.required,
			])
			],
			password: [DEMO_PARAMS.PASSWORD, Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			confirmPassword: [DEMO_PARAMS.CONFIRMPASSWORD, Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			]
		},{
			validator: ConfirmPasswordValidator.MatchPassword
		});
	}

	submit() {
		this.authNoticeService.setNotice(null, 'danger');
		const controls = this.resetForm.controls;
		if (this.resetForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;

		const authData = {
			code: controls.code.value,
			password: controls.password.value,
			confirmPassword: controls.confirmPassword.value
		};
		this.auth
			.reset(authData.password, authData.code)
			.pipe(
				tap(user => {
					if (user) {
						this.router.navigateByUrl('/auth/login');
					} else {
						this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
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
					 console.log('error ==> ', err)
					if(err && err.status && err.status === 400){
						this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.CODE_ERROR'), 'danger');
					} else{
						this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.BACKEND_ERROR'), 'danger');
					}
					return of(null);
			})
			)
			.subscribe();
	}
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.resetForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}
