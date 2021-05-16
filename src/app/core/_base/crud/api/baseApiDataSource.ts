import { BaseDataSource } from '..';
import { of, BehaviorSubject } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { BaseApiService } from './baseAPI';


export class BaseApiDataSource<T extends BaseApiService<any>> extends BaseDataSource {
    lastParams: any;
    loadingSubject = new BehaviorSubject<boolean>(false)
    constructor(private serviceApi: T) {
        super();
        this.loading$ = this.loadingSubject.asObservable();

    }
    toogleIndecators(b) {
        this.isPreloadTextViewed$ = of(b);
        this.loadingSubject.next(b);
    }
    endLoad() {
        this.toogleIndecators(false);
    }
    startLoad() {
        this.toogleIndecators(true);
    }
    query(p) {
        this.startLoad();
        this.lastParams = p;
        this.serviceApi
            .query(p)
            .pipe(catchError(() => of([])), finalize(() => this.endLoad()))
            .subscribe(result => {
                this.paginatorTotalSubject.next(result['count']);
                this.entitySubject.next(result['result']);
            });
    }
    refresh() {
        this.query(this.lastParams)
    }

}
