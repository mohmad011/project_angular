import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubheaderService } from '../../../../../core/_base/layout';
import { Admin } from '../../../../../core/service/_models/admin.model';

@Component({
	templateUrl: './form.component.html',
})
export class AdminsFormComponent implements OnInit, OnDestroy {
	admin: Admin;
	adminsForm: FormGroup;
	isFileUploading = false;
	hasFormErrors = false;
	IsEdit = false;
	ImageUrl: string;
	private subscriptions: Subscription[] = [];
	messages: any;
	validators = [Validators.required];
	photo: string;
	uploadedPicture: string;
	noPic: boolean;
	uploading: boolean;
	constructor(private activatedRoute: ActivatedRoute,
		private adminFB: FormBuilder,
		private router: Router,
		private subheaderService: SubheaderService,
		private translate: TranslateService,
		private ngZone: NgZone,
		public dialog: MatDialog) {
		this.initForm();
		this.loadTranslation();
		translate.onLangChange.subscribe(() => {
			this.loadTranslation();
		});
	}

	onTagsChange(tags: string[]) {
		this.adminsForm.controls.tags.setValue(tags);
	}

	onAdminChange(admin: any) {
		this.adminsForm.controls.admin.setValue(admin.id);
	}

	private loadTranslation() {
		this.translate.get(['ADMIN.LIST.ADMIN_SAVED', 'ADMIN.LIST.NEW_ADMIN_SAVED',
			'ADMIN.LIST.CREATE_ADMIN', 'ADMIN.LIST.EDIT_ADMIN',
			'ADMIN.LIST.ADMIN', 'ADMIN.LIST.ADMINS',
			'ADMIN.LIST.ADMINS_LIST']).subscribe((res: any) => {
				this.messages = res;
			});
	}

	ngOnInit() {
		const routeSubscription = this.activatedRoute.params.subscribe(params => {
			const id = params.id;
			if (id) {
				this.IsEdit = true;
			}
		});
		this.subscriptions.push(routeSubscription);
	}


	initAdmin() {
		this.createForm();
		this.subheaderService.setTitle(this.messages['ADMIN.LIST.EDIT_ADMIN']);
		this.subheaderService.setBreadcrumbs([

			{ title: this.messages['ADMIN.LIST.ADMINS'], page: `admin` },
			{
				title: this.messages['ADMIN.LIST.EDIT_ADMIN'], page: `admin/edit`,
				queryParams: { id: this.admin.id }
			}
		]);
	}

	createForm() {
		this.adminsForm.patchValue({
			email: this.admin.email,
			fullname: this.admin.fullname,
			mobile: this.admin.mobile,
			password: this.admin.password,
			avatar: this.admin.avatar
		});

		this.uploadedPicture = this.admin.avatar;
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}

	initForm() {
		this.adminsForm = this.adminFB.group({
			fullname: [null, Validators.required],
			email: [null, Validators.required],
			mobile: [null, Validators.required],
			password: [null, Validators.required],
			avatar: [null],
		});

	}

	getComponentTitle() {
		let result = this.messages['ADMIN.LIST.CREATE_ADMIN'];
		if (!this.admin || !this.admin.id) {
			return result;
		}

		result = this.messages['ADMIN.LIST.EDIT_ADMIN'] + ' - ' + this.admin.fullname;
		return result;
	}

	goBackWithId() {
		const url = `/admin`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute }).then();
	}


	onSubmit(withBack: boolean = false) {
		if (this.adminsForm['isUploading'])
			return;
		this.hasFormErrors = false;
		const controls = this.adminsForm.controls;
		if (this.adminsForm.invalid) {
			Object.keys(controls).forEach(controlName => {
				controls[controlName].markAsTouched();
				console.log(controlName, controls[controlName].errors);
			}
			);
			this.hasFormErrors = true;
			console.log(this.prepareAdmin());
			return;
		}

		const editedAdmin = this.prepareAdmin();

	}


	prepareAdmin(): Admin {
		const controls = this.adminsForm.controls;
		const admin = new Admin();
		admin.id = !!this.admin ? this.admin.id : null;
		admin.fullname = controls.fullname.value;
		admin.email = controls.email.value;
		admin.password = controls.password.value;
		admin.mobile = controls.mobile.value;
		admin.avatar = this.uploadedPicture;

		return admin;
	}



	// onFileChange(event: any) {
	//     this.uploading = true;
	//     const fileList: FileList = event.target.files;
	//     if (fileList.length > 0) {
	//         this.isFileUploading = true;
	//         let file: File = fileList[0];
	//         this.adminsApi.upload(file).subscribe(
	//             (image) => {
	//                 this.uploading = false;
	//                 this.ImageUrl = image.path;
	//                 console.log(this.ImageUrl);
	//                 this.noPic = false;
	//                 this.uploadedPicture = true;
	//                 this.isFileUploading = false;
	//             },
	//             (error) => {
	//                 console.error(error);
	//                 this.ngZone.run(() => {
	//                     this.isFileUploading = false;
	//                 });
	//              }
	//         );
	//     }
	// }


	refreshAdmin(isNew: boolean = false, id = 0) {
		let url = this.router.url;
		if (!isNew) {
			this.router.navigate([url], { relativeTo: this.activatedRoute }).then();
			return;
		}

		url = `/admin/edit/${id}`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute }).then();
	}


	onAlertClose($admin) {
		this.hasFormErrors = false;
	}
}
