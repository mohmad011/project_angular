import { BehaviorSubject, Observable } from 'rxjs';
export class AsyncObject<T> {

    private subject: BehaviorSubject<T>;
    public value: Observable<T>;

    constructor(v: T) {
        this.subject = new BehaviorSubject<T>(v);
        this.value = this.subject.asObservable();
    }
    next(value) {
        this.subject.next(value)
    }
    complete() {
        this.subject.complete();
    }

}
