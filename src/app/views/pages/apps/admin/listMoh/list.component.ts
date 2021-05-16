import {
	Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, OnDestroy
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { LayoutUtilsService } from '../../../../../core/_base/crud';
import { SubheaderMohService } from '../../../../../core/_base/layout';
import { Admin } from '../../../../../core/service/_models/admin.model';
import { baseListMohComponent } from '../../../../../core/baseListMohComponent';

@Component({
	selector: 'kt-events-list',
	templateUrl: './list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminsListComponent extends baseListMohComponent<Admin> implements OnInit, OnDestroy {
	@ViewChild('searchInput', { static: true }) searchInput: ElementRef;

	constructor(
		activatedRoute: ActivatedRoute,
		router: Router,
		layoutUtilsService: LayoutUtilsService,
		subheaderMohService:SubheaderMohService,
		translate: TranslateService) {
		super(activatedRoute, router, layoutUtilsService,subheaderMohService , null, translate);
		this.displayedColumns = [
			'admin',
			'email',
			'actions'
		];

		this.deleteDialogLabls = {
			title: 'ADMIN.LIST.ADMIN_DELETE',
			description: 'ADMIN.LIST.CONFIRM_ADMIN_DELETE',
			waitDescription: 'ADMIN.LIST.WAIT_ADMIN_DELETE',
			deleteMessage: 'ADMIN.LIST.DELETED_ADMIN_MESSAGE',
		};

		this.translationLabels = [
			this.deleteDialogLabls.title,
			this.deleteDialogLabls.description,
			this.deleteDialogLabls.waitDescription,
			this.deleteDialogLabls.deleteMessage,
		];


	}

	async ngOnInit() {
		this.searchEvents = [
			fromEvent(this.searchInput.nativeElement, 'keyup')
		];
		this.init();
	}

	ngOnDestroy() {
		this.destroy();
	}

	searchForm() {
		const searchText: string = this.searchInput.nativeElement.value;
		return {
			and: [
				{
					or:
						[
							{ fullname: { like: searchText + '.*', options: 'i' } },
							{ mobile: { like: searchText + '.*', options: 'i' } },
							{ email: { like: searchText + '.*', options: 'i' } },
						]

				}
			]

		};
	}

}
