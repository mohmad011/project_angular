import {
    Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild, ElementRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';
import { SubheaderMohService } from '../../../../../core/_base/layout';
import { baseListMohComponent } from '../../../../../core/baseListMohComponent';
import { fromEvent, Observable } from 'rxjs';
import { BankingService , BankMohService } from '../../../../../core/service/_services';
import { BankMoh } from '../../../../../core/service/_models/bankMoh.model';

@Component({
    selector: 'kt-badges-list',
    templateUrl: './listMoh.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MohListComponent extends baseListMohComponent<BankMoh> implements OnInit, OnDestroy {
    @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

    constructor(
        activatedRoute: ActivatedRoute,
        router: Router,
        layoutUtilsService: LayoutUtilsService,
        subheaderMohService: SubheaderMohService,
        private bankMohService: BankMohService,
        translate: TranslateService
    ) {


        super(activatedRoute, router, layoutUtilsService, subheaderMohService ,bankMohService, translate);

         this.displayedColumns = ['title', 'description', 'active', 'availablePositions', 'post_date', 'actions'];

        this.deleteDialogLabls = {
            title: 'BANKMOH.LIST.BANKMOH_DELETE',
            description: 'BANKMOH.LIST.CONFIRM_BANKMOH_DELETE',
            waitDescription: 'BANKMOH.LIST.WAIT_BANKMOH_DELETE',
            deleteMessage: 'BANKMOH.LIST.DELETED_BANKMOH_MESSAGE',
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
