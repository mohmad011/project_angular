import { ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Subscription, merge, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutUtilsService, MessageType } from './_base/crud';
import { SubheaderMohService } from './_base/layout';
import { TranslateService } from '@ngx-translate/core';
import { tap, debounceTime, distinctUntilChanged, skip } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { BaseApiService } from './_base/crud/api/baseAPI';
import { BaseApiDataSource } from './_base/crud/api/baseApiDataSource';


export class baseListMohComponent<T>  {
    dataSource: BaseApiDataSource<BaseApiService<T>>;
    displayedColumns = [];
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild('sort1', { static: true }) sort: MatSort;
    searchEvents: Observable<unknown>[] = [];
    selection = new SelectionModel<T>(true, []);
    result: any;
    messages: any;
    translationLabels: string[];
    deleteDialogLabls: {
        title: any,
        description: any,
        waitDescription: any,
        deleteMessage: any,
    }
    public editURL = "./edit";
    private subscriptions: Subscription[] = [];

    constructor(
        protected activatedRoute: ActivatedRoute,
        private router: Router,
        protected layoutUtilsService: LayoutUtilsService,
        public subheaderMohService: SubheaderMohService,
        private apiService: BaseApiService<T>,
        private translate: TranslateService) {

        this.dataSource = new BaseApiDataSource(this.apiService);

    }
    init(): void {
        this.loadTranslation();
        this.sortEvent$();
        this.paginatorEvent$();
        this.searchEvent$();

        const entitiesSubscription = this.dataSource.entitySubject.pipe(
            skip(1),
            distinctUntilChanged()
        ).subscribe(res => {
            this.result = res;
        });
        this.subscriptions.push(entitiesSubscription);
        this.paginator.initialized.subscribe(() => {
            this.dataSource.query(this.filterConfiguration());
        });
    }
    private loadTranslation() {
        this.translate.get(this.translationLabels).subscribe((res: any) => {
            this.messages = res;
        });
        this.translate.onLangChange.subscribe(() => {
            this.loadTranslation();
        });
    }

    private sortEvent$() {
        const sortSubscription = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
        this.subscriptions.push(sortSubscription);
    }

    private paginatorEvent$() {
        const paginatorSubscriptions = merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                tap(() => {
                    this.fetch();
                })
            )
            .subscribe();
        this.subscriptions.push(paginatorSubscriptions);
    }

    private searchEvent$() {

        this.searchEvents.forEach(e => {
            const searchSubscription = e.pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;
                    this.fetch();
                })
            )
                .subscribe();
            this.subscriptions.push(searchSubscription);
        })
    }

    private fetch() {
        this.selection.clear();
        this.dataSource.query(this.filterConfiguration());
        this.selection.clear();
    }
    searchForm() { }

    include() { }

    orderInit() {
        return 'id';
    }
    private filterConfiguration(): any {
        const filter: any = {
            where: this.searchForm(),
            order: `${this.sort.active ? this.sort.active : this.orderInit()} ${this.sort.direction}`,
            limit: this.paginator.pageSize,
            offset: (this.paginator.pageSize * this.paginator.pageIndex),
            include: this.include()
        };
        return filter;
    }

    public editRow(id) {
        this.router.navigate([this.editURL, id], { relativeTo: this.activatedRoute }).then();
    }

    public removeRow(item: T) {

        const dialogRef = this.layoutUtilsService.
            deleteElement(
                this.messages[this.deleteDialogLabls.title],
                this.messages[this.deleteDialogLabls.description],
                this.messages[this.deleteDialogLabls.waitDescription]);
        dialogRef.afterClosed().subscribe(async res => {
            if (!res) {
                return;
            }

            await this.apiService.destroy(item['id']).toPromise();
			this.afterDelete();
            await this.dataSource.refresh();
            this.layoutUtilsService.showActionNotification(this.messages[this.deleteDialogLabls.deleteMessage], MessageType.Delete);
        });
    }

    afterDelete() {}

    // public isAllSelected(): boolean {
    //     const numSelected = this.selection.selected.length;
    //     const numRows = this.result.length;
    //     return numSelected === numRows;
    // }

    // public masterToggle() {
    //     if (this.selection.selected.length === this.result.length) {
    //         this.selection.clear();
    //     } else {
    //         this.result.forEach(row => this.selection.select(row));
    //     }
    // }

    destroy() {
        this.subscriptions.forEach(el => el.unsubscribe());
    }
}
