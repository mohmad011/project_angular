import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, takeUntil, tap, switchMap, catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
import { AuthNoticeService, AuthService, Login } from '../../../../core/auth/';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { User, } from '../../../../core/service';


@Component({
	selector: 'kt-register',
	templateUrl: './register.component.html',
	encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit, OnDestroy {
	registerForm: FormGroup;
	loading = false;
	agreeRequired: boolean = false
	errors: any = [];
	cities: any;
	countries: any

	private unsubscribe: Subject<any>;
	userEmailExisted: boolean;
	userMobileExisted: boolean;


	constructor(
		private authNoticeService: AuthNoticeService,
		public translate: TranslateService,
		private router: Router,
		private route: ActivatedRoute,
		private auth: AuthService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
	) {
		this.unsubscribe = new Subject();
	}

	ngOnInit() {
		this.initRegisterForm();
		this.countries = []

	}
	onSelect(event) {

	}
	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null, 'danger');
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	initRegisterForm() {
		this.registerForm = this.fb.group({
			email: ['', Validators.compose([
				Validators.required,
				Validators.email,
				Validators.minLength(3),
				Validators.maxLength(320)
			]),
			],
			firstName: ['', Validators.compose([
				Validators.required,
			]),
			],
			lastName: ['', Validators.compose([
				Validators.required,
			]),
			],
			mobile: ['', Validators.compose([
				//Validators.required,
			]),
			],
			dateOfBirth: [null],
			Address: [''],
			region: [''],
			countryId: [null],
			cityId: [null],
			password: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			confirmPassword: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			agree: [false, [Validators.required]]
		}, {
			validator: ConfirmPasswordValidator.MatchPassword
		});
	}

	async submit() {
		const controls = this.registerForm.controls;
		if (this.registerForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;

		if (!controls.agree.value) {
			this.agreeRequired = true
			this.loading = false;

			this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.MUST_ACCEPT_TERMS'), 'danger');
			return;
		}

		const _user: User = new User();
		_user.email = controls.email.value;
		_user.firstName = controls.firstName.value;
		_user.lastName = controls.lastName.value;
		_user.region = controls.region.value;
		_user.mobile = controls.mobile.value;
		_user.cityId = controls.cityId.value;
		_user.countryId = controls.countryId.value;
		_user.password = controls.password.value;
		_user.Address = controls.Address.value;
		_user.dateOfBirth = controls.dateOfBirth.value;
		_user.type = "Admin"
		this.auth.register(_user).pipe(
			switchMap(() => this.auth.login(_user.email, _user.password).pipe(
				tap(user => {
					if (user) {
						this.authNoticeService.setNotice(this.translate.instant('AUTH.REGISTER.SUCCESS'), 'success');
						this.store.dispatch(new Login(user));
						this.router.navigateByUrl('/');
					} else {
						this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
					}
				},
				),
				takeUntil(this.unsubscribe),
				finalize(() => {
					this.loading = false;
					this.cdr.markForCheck();
				})

			)),
			catchError(err => {
				this.loading = false;
				this.cdr.markForCheck();
				this.userEmailExisted = false;
				this.userMobileExisted = false;
				if (err.error && (
					err.error && err.error.statusCode == 451
					|| (err.error.error && err.error.error.statusCode && (err.error.error.statusCode == 451 || err.error.error.statusCode == 422)))) {
					this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.EMAIL_EXISTED'), 'danger');
					this.registerForm.controls.email.setErrors({ invalid: true })
					this.userEmailExisted = true;
				} else if (err.error && (
					err.error && err.error.statusCode == 450
					|| (err.error.error && err.error.error.statusCode && err.error.error.statusCode == 450))) {
					this.registerForm.controls.mobile.setErrors({ invalid: true })
					this.userMobileExisted = true
					this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.MOBILE_EXIST'), 'danger');
				} else {
					this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.BACKEND_ERROR'), 'danger');
				}
				return of(null);
			})
		).subscribe(() => { },
			error => { })
	}
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.registerForm.controls[controlName];
		if (!control) {
			return false;
		}
		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}
