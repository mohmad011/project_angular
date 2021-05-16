import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ActionsSubject } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { Banking } from '../../../../../core/service/_models/banking.model';
import { SubheaderService } from '../../../../../core/_base/layout';
import { BankingService } from '../../../../../core/service/_services';

@Component({
	selector: 'kt-user-badges-form',
	templateUrl: './form.component.html',
})
export class BankingFormComponent implements OnInit, OnDestroy {
	bankingSettings: Banking;
	bankingSettingsForm: FormGroup;
	hasFormErrors = false;
	color: any = '#000000';
	uploadedPicture: any;
	isFileUploading = false;
	messages: any;
	private subscriptions: Subscription[] = [];
	validators = [Validators.required];
	blockedPINS: string[] = [];
	selectable = true;
	removable = true;
	addOnBlur = true;
	separatorKeysCodes: number[] = [ENTER, COMMA];



	constructor(
		private activatedRoute: ActivatedRoute,
		private subheaderService: SubheaderService,
		private bankingSettingsFB: FormBuilder,
		private actionsSbj: ActionsSubject,
		private router: Router,
		private bankingSettingsApi: BankingService,
		private translate: TranslateService,
		public dialog: MatDialog) {
		this.initForm();
		this.loadTranslation();
		translate.onLangChange.subscribe(() => {
			this.loadTranslation();
		});
	}

	private loadTranslation() {
		this.translate.get(['BANKING_SETTINGS.LIST.BANKING_SETTINGS_SAVED', 'BANKING_SETTINGS.LIST.NEW_BANKING_SETTINGS_SAVED',
			'BANKING_SETTINGS.LIST.CREATE_BANKING_SETTING', 'BANKING_SETTINGS.LIST.EDIT_BANKING_SETTINGS',
			'BANKING_SETTINGS.LIST.BANKING_SETTINGS', 'BANKING_SETTINGS.LIST.BANKING_SETTINGS',
			'BANKING_SETTINGS.LIST.BANKING_SETTINGS_LIST']).subscribe((res: any) => {
				this.messages = res;
			});
	}

	ngOnInit() {
		const routeSubscription = this.activatedRoute.params.subscribe(params => {
			const id = params.id;
			if (id)
			{
				this.bankingSettingsApi.get(id).subscribe(res => {
					if (res)
					{
						this.bankingSettings = res;
						this.initBankingSettings();
					}
				});
			}
		});
		this.subscriptions.push(routeSubscription);
	}

	ngOnDestroy() { }

	initBankingSettings() {
		this.createForm();
		this.subheaderService.setTitle(this.messages['BANKING_SETTINGS.LIST.EDIT_BANKING_SETTINGS']);
		this.subheaderService.setBreadcrumbs([

			{ title: this.messages['BANKING_SETTINGS.LIST.BANKING_SETTINGS'], page: `bsankingSettingss` },
			{
				title: this.messages['BANKING_SETTINGS.LIST.EDIT_BANKING_SETTINGS'], page: `bsankingSettings`,
				queryParams: { id: this.bankingSettings.id }
			}
		]);
	}

	initForm() {
		this.bankingSettingsForm = this.bankingSettingsFB.group({
			title: [null, Validators.required],
			limit: [null, Validators.required],
			authorizeLoginID: [null, Validators.required],
			authorizeKey: [null, Validators.required]
		});
	}

	createForm() {
		this.bankingSettingsForm.patchValue({
			title: this.bankingSettings.title,
			limit: this.bankingSettings.limit,
			authorizeLoginID: this.bankingSettings.authorizeLoginID,
			authorizeKey: this.bankingSettings.authorizeKey
		});

		this.blockedPINS = this.bankingSettings.blockedPINS || [];
	}

	goBackWithId() {
		const url = `/bsankingSettings`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute }).then();
	}

	refreshBankingSettings(isNew: boolean = false, id = 0) {
		let url = this.router.url;
		if (!isNew)
		{
			this.router.navigate([url], { relativeTo: this.activatedRoute }).then();
			return;
		}

		url = `/bsankingSettings/${id}`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute }).then();
	}

	onSubmit(withBack: boolean = false) {
		if (this.bankingSettingsForm['isUploading'])
			return;

		this.hasFormErrors = false;
		const controls = this.bankingSettingsForm.controls;
		if (this.bankingSettingsForm.invalid || this.isFileUploading)
		{

			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			this.hasFormErrors = true;
			return;
		}

		const editedBankingSettings = this.prepareBankingSettings();
		this.bankingSettingsApi.save(editedBankingSettings).subscribe(() => {
			this.router.navigate(['/banking']).then();
		});
	}

	prepareBankingSettings(): Banking {
		const controls = this.bankingSettingsForm.controls;
		const pm = new Banking();
		if (this.bankingSettings)
		{
			pm.id = this.bankingSettings.id;
		}
		pm.title = controls.title.value;
		pm.limit = parseInt(controls.limit.value, 10);
		pm.authorizeKey = controls.authorizeKey.value;
		pm.authorizeLoginID = controls.authorizeLoginID.value;
		pm.blockedPINS = this.blockedPINS;

		return pm;
	}

	add(event: MatChipInputEvent): void {
		const input = event.input;
		const value = event.value;
		if ((value || '').trim())
		{
			this.blockedPINS.push(value.trim());
		}
		if (input)
		{
			input.value = '';
		}
	}

	remove(option): void {
		const index = this.blockedPINS.indexOf(option);
		if (index >= 0)
		{
			this.blockedPINS.splice(index, 1);
		}
	}

	getComponentTitle() {
		let result = this.messages['BANKING_SETTINGS.LIST.CREATE_BANKING_SETTINGS'];
		if (!this.bankingSettings || !this.bankingSettings.id)
		{
			return result;
		}
		result = this.messages['BANKING_SETTINGS.LIST.EDIT_BANKING_SETTINGS'] + ' - ' + this.bankingSettings.title;

		return result;
	}

	onAlertClose($event) {
		this.hasFormErrors = false;
	}
}

