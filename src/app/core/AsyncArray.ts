import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
export class AsyncArray {

    public arraySubject = new BehaviorSubject<any[]>([]);
    public values: Observable<any[]>;
    private store = [];
    constructor() {
        this.arraySubject
            .pipe(tap(c => console.log('taped')));
        this.values = this.arraySubject.asObservable();
    }

    public push(a) {
        this.store.push(a);
        this.arraySubject.next(this.store);
    }
    public add(a) {
        this.store = [...this.store, ...a];
        this.arraySubject.next(this.store);
    }
    public set(a) {
        if (a) {
            this.store = [...a];
            this.arraySubject.next(this.store);
        }
    }
    public reset() {
        this.store = [];
        this.arraySubject.next(this.store);
    }
    public remove(a) {
        const index: number = this.store.indexOf(a);
        this.store = [...this.store.slice(0, index), ...this.store.slice(index + 1)];
        this.arraySubject.next(this.store);
    }
}
