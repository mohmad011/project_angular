import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { fromEvent } from 'rxjs';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from '../../../../../core/reducers';
import { LayoutUtilsService } from '../../../../../core/_base/crud';
import { SubheaderService } from '../../../../../core/_base/layout';
import { User } from '../../../../../core/service';
import { UsersService } from '../../../../../core/service/_services';
import { baseListComponent } from '../../../../../core/baseListComponent';

@Component({
	selector: 'kt-users-list',
	templateUrl: './list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent extends baseListComponent<User> implements OnInit, OnDestroy {
	@ViewChild('searchInput', { static: true }) searchInput: ElementRef;

	constructor(
		activatedRoute: ActivatedRoute,
		store: Store<AppState>,
		router: Router,
		layoutUtilsService: LayoutUtilsService,
		subheaderService: SubheaderService,
		private usersApi: UsersService,
		translate: TranslateService,
		public dialog: MatDialog) {

		super(activatedRoute, router, layoutUtilsService, subheaderService, usersApi, translate);

		this.displayedColumns = ['name', 'email', 'role', 'actions'];

		this.deleteDialogLabls = {
			title: 'USER_MANAGEMENT.LIST.USER_DELETE',
			description: 'USER_MANAGEMENT.LIST.CONFIRM_USER_DELETE',
			waitDescription: 'USER_MANAGEMENT.LIST.WAIT_USER_DELETE',
			deleteMessage: 'USER_MANAGEMENT.LIST.DELETED_USER_MESSAGE',
		};

		this.translationLabels = [
			this.deleteDialogLabls.title,
			this.deleteDialogLabls.description,
			this.deleteDialogLabls.waitDescription,
			this.deleteDialogLabls.deleteMessage,
		];
	}

	ngOnDestroy() {
		this.destroy();
	}

	ngOnInit() {
		this.searchEvents = [
			fromEvent(this.searchInput.nativeElement, 'keyup')
		];
		this.init();
	}

	searchForm() {
		const searchText: string = this.searchInput.nativeElement.value;
		return {
			or: [
				{ name: { like: searchText + '.*', options: 'i' } },
				{ email: { like: searchText + '.*', options: 'i' } },
				{ role: { like: searchText + '.*', options: 'i' } }
			]
		};
	}
}
