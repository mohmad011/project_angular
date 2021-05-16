import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ActionsSubject } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { Banking } from '../../../../../core/service/_models/banking.model';
import { SubheaderMohService } from '../../../../../core/_base/layout';
import { BankingService , BankMohService } from '../../../../../core/service/_services';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { BankMoh } from '../../../../../core/service/_models/bankMoh.model';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'kt-user-badges-form',
	templateUrl: './formMoh.component.html',
})
export class MohFormComponent implements OnInit, OnDestroy {
	bankMoh: BankMoh;
	bankMohForm: FormGroup;
	hasFormErrors = false;
	color: any = '#000000';
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
		private subheaderMohService: SubheaderMohService,
		private bankMohFormFB: FormBuilder,
		private actionsSbj: ActionsSubject,
		private router: Router,
		private bankingSettingsApi: BankingService,
		private translate: TranslateService,
		private BankMohApi: BankMohService,
		private datePipe:DatePipe,
		public dialog: MatDialog) {
		this.initForm();
		this.loadTranslation();
		translate.onLangChange.subscribe(() => {
			this.loadTranslation();
		});
	}

	private loadTranslation() {
		this.translate.get(['BANKMOH.LIST.BANKMOH_SAVED', 'BANKMOH.LIST.NEW_BANKMOH_SAVED',
			'BANKMOH.LIST.CREATE_BANKING_SETTING', 'BANKMOH.LIST.EDIT_BANKMOH',
			'BANKMOH.LIST.BANKMOH', 'BANKMOH.LIST.BANKMOH',
			'BANKMOH.LIST.BANKMOH_LIST']).subscribe((res: any) => {
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
						this.bankMoh = res;
						this.initbankMoh();
					}
				});
			}
		});
		this.subscriptions.push(routeSubscription);
	}

	ngOnDestroy() { }

	initbankMoh() {
		this.createForm();
		this.subheaderMohService.setTitle(this.messages['BANKMOH.LIST.EDIT_BANKMOH']);
		this.subheaderMohService.setBreadcrumbs([

			{ title: this.messages['BANKMOH.LIST.BANKMOH'], page: `bsankingSettingss` },
			{
				title: this.messages['BANKMOH.LIST.EDIT_BANKMOH'], page: `bsankingSettings`,
				queryParams: { id: this.bankMoh.id }
			}
		]);
	}

	initForm() {
		this.bankMohForm = this.bankMohFormFB.group({
			title: [null, Validators.required],
			description: [null, Validators.required],
			active: [false, Validators.required],
			availablePositions: [null, Validators.required],
			post_date: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), [Validators.required]]
		});
	}

	createForm() {
		this.bankMohForm.patchValue(this.bankMoh)
	}

	goBackWithId() {
		const url = `/job-adv`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute }).then();
	}

	refreshjobAdv(isNew: boolean = false, id = 0) {

		let url = this.router.url;
		if (!isNew)
		{
			this.router.navigate([url], { relativeTo: this.activatedRoute }).then();
			return;
		}

		url = `/job-adv/${id}`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute }).then();
	}

	onSubmit(withBack: boolean = false) {

		this.hasFormErrors = false;
		const controls = this.bankMohForm.controls;
		if (this.bankMohForm.invalid)
		{

			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			this.hasFormErrors = true;
			return;
		}

		const editedprepareJobAdv = this.prepareBankMoh();
		this.BankMohApi.save(editedprepareJobAdv).subscribe(() => {
			this.router.navigate(['/job-adv']).then();
		});
	}

	prepareBankMoh(): BankMoh {
		const controls = this.bankMohForm.controls;
		const pm = new BankMoh();
		if (this.bankMoh){
			pm.id = this.bankMoh.id;
		}
		pm.title = controls.title.value;
		pm.description =  controls.description.value;
		pm.availablePositions = parseInt(controls.availablePositions.value, 10);
		pm.active = controls.active.value;
		pm.post_date = controls.post_date.value;
		return pm;
	}

	getComponentTitle() {
		let result = this.messages['BANKMOH.LIST.CREATE_BANKMOH'];
		if (!this.bankMoh || !this.bankMoh.id)
		{
			return result;
		}
		result = this.messages['BANKMOH.LIST.EDIT_BANKMOH'] + ' - ' + this.bankMoh.title;
		return result;
	}

	onAlertClose($event) {
		this.hasFormErrors = false;
	}

	isActive(active: boolean) {
		console.log(active)
		this.bankMohForm.get("active").setValue(active);
	}
}
