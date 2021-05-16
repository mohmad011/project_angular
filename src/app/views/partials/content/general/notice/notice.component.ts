// Angular
import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'kt-notice',
	templateUrl: './notice.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoticeComponent implements OnInit {
	// Public properties
	@Input() classes: any = '';
	@Input() icon: any;
	type: string = '';
	message: string = '';
	private subscriptions: Subscription[] = [];
	/**
	 * Component constructor
	 */
	constructor(private cdr: ChangeDetectorRef) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		this.subscriptions;
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}
}
