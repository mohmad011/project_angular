import { Component, Output, EventEmitter, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, of, BehaviorSubject } from "rxjs";
import { MatChipInputEvent } from "@angular/material";

import { IOptionSource } from "./optionSource.interface";
import { ENTER } from "@angular/cdk/keycodes";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
	selector: "auto-complete",
	templateUrl: "autoComplete.component.html",
})
export class AutoCompleteComponent {
	@Output() currSelectionsChange = new EventEmitter<any>();
	@Input() currSelections: string[] = [];
	@Input() placeHolder: string;

	@Input() optionsSource: IOptionSource;
	@Output() notifyChange: EventEmitter<any[]> = new EventEmitter<any[]>();

	data: any[];
	values: any[];
	loadinSubject = new BehaviorSubject(false);
	loading$: Observable<boolean>;
	constructor() {
		this.loading$ = this.loadinSubject.asObservable();
	}
	onUpdate($evet) {
		console.log($evet.value);
		this.currSelections = $evet.value;
		this.values = $evet.options;
		console.log($evet.options);
		this.currSelectionsChange.emit(this.currSelections);
		this.notifyChange.emit([{ id: this.currSelections }]);
	}

	async ngOnInit() {
		this.currSelections = this.currSelections || [];

		await this.getInitValues();
	}

	display(x) {
		if (typeof this.optionsSource.display === "string") {
			return x[this.optionsSource.display];
		} else if (typeof this.optionsSource.display === "function") {
			return this.optionsSource.display(x);
		}
	}

	getInitValues() {
		let filter: any = { where: {id: this.currSelections }};
		if (this.optionsSource.multiple) {
			filter = {
				where: {id: { inq: this.currSelections }}
			};
		}
		if (this.currSelections && this.currSelections.length) {
			this.optionsSource.sourceApi.query(filter).subscribe((res) => {
				this.data = res.result.map(this.map);
				this.loadinSubject.next(true);
			});
		} else {
			this.search("");
		}
	}
	search(txt) {
		this.optionsSource.sourceApi
			.lookup(txt, this.optionsSource.key)
			.subscribe((res) => {
				if (this.values) {
					this.data = [...res.result.map(this.map), ...this.values];
				} else {
					this.data = [...res.result.map(this.map)];
				}

				this.loadinSubject.next(true);
			});
	}

	map = (x) => {
		return {
			value: x.id,
			label: this.display(x),
		};
	};
}
