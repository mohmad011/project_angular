// Angular
import { Component, Inject, OnInit, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ProfilesServices } from '../../../../../core/service/_services';

@Component({
	selector: 'kt-user-export-dialog',
	templateUrl: './user-export-dialog.component.html'
})
export class UserExportDialogComponent implements OnInit {
	// Public properties
	viewLoading = false;
	userExportForm: FormGroup;

	constructor(
		public dialogRef: MatDialogRef<UserExportDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any, private certificatesFB: FormBuilder,
		private ngZone: NgZone, private ProfileApi: ProfilesServices, private formBuilder: FormBuilder
	) {
		this.initForm();
	}
	ngOnInit() {
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
	initForm() {
		this.userExportForm = this.certificatesFB.group({
			fields: this.formBuilder.array([])
		});
		const formArray = this.userExportForm.get('fields') as FormArray;
		this.data.fields.forEach(x => formArray.push(new FormControl(false)));
	}
	onYesClick(): void {
		const result = Object.assign({},
			this.userExportForm.value,
			{
				fields: this.data.fields
					.filter((x, i) => !!this.userExportForm.value.fields[i])
			});
		let fields = [];
		for (let item of result.fields) {
			fields.push(item.name);
		}
		console.log(fields, result.fields)

		this.ProfileApi.export(this.data.where, fields, this.data.order)
		this.dialogRef.close();

	}
}
