import {
    Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild, ElementRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';
import { SubheaderService } from '../../../../../core/_base/layout';
import { Banking } from '../../../../../core/service/_models/banking.model';
import { baseListComponent } from '../../../../../core/baseListComponent';
import { fromEvent, Observable } from 'rxjs';
import { BankingService } from '../../../../../core/service/_services';


@Component({
    selector: 'kt-badges-list',
    templateUrl: './list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BankingListComponent extends baseListComponent<Banking> implements OnInit, OnDestroy {
    @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

    constructor(
        activatedRoute: ActivatedRoute,
        router: Router,
        layoutUtilsService: LayoutUtilsService,
        subheaderService: SubheaderService,
        private bankingSettingsService: BankingService,
        translate: TranslateService
    ) {

        super(activatedRoute, router, layoutUtilsService, subheaderService, bankingSettingsService, translate);

        this.displayedColumns = ['title', 'limit', 'remainder', 'actions'];

        this.deleteDialogLabls = {
            title: 'BANKING_SETTINGS.LIST.BANKING_SETTINGS_DELETE',
            description: 'BANKING_SETTINGS.LIST.CONFIRM_BANKING_SETTINGS_DELETE',
            waitDescription: 'BANKING_SETTINGS.LIST.WAIT_BANKING_SETTINGS_DELETE',
            deleteMessage: 'BANKING_SETTINGS.LIST.DELETED_BANKING_SETTINGS_MESSAGE',
        };

        this.translationLabels = [
            this.deleteDialogLabls.title,
            this.deleteDialogLabls.description,
            this.deleteDialogLabls.waitDescription,
            this.deleteDialogLabls.deleteMessage,
        ];


    }
    ngOnDestroy(): void {
        this.destroy();
    }
    async ngOnInit() {
        this.searchEvents = [
            fromEvent(this.searchInput.nativeElement, 'keyup')
        ];
        this.init();
    }
    searchForm() {
        const searchText: string = this.searchInput.nativeElement.value;
        return {
            or: [
                { title: { like: searchText + '.*', options: 'i' } },
                { limit: { like: searchText + '.*', options: 'i' } }
            ]
        };
    }

}


