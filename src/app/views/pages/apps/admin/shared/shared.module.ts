// Angular
import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

// Material

// Translate Module
import { TranslateModule } from "@ngx-translate/core";
import { Select2Module } from "ng-select2-component";
import { NgbProgressbarModule, NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPermissionsModule } from "ngx-permissions";
import { PartialsModule } from "../../../../../../app/views/partials/partials.module";
import {
	MatDialogModule,
	MatButtonModule,
	MatMenuModule,
	MatSelectModule,
	MatInputModule,
	MatTableModule,
	MatAutocompleteModule,

	MatRadioModule,
	MatIconModule,
	MatNativeDateModule,
	MatProgressBarModule,
	MatDatepickerModule,
	MatCardModule,
	MatToolbarModule,
	MatPaginatorModule,
	MatSortModule,
	MatCheckboxModule,
	MatProgressSpinnerModule,
	MatSnackBarModule,
	MatTabsModule,
	MatTooltipModule,
	MatSlideToggleModule,
	MatListModule,
	MatGridListModule,
	MatFormFieldModule,
	MatChipsModule,
	MatChipList,
} from "@angular/material";
import { ColorPickerModule } from "ngx-color-picker";
import { WidgetModule } from "../../../../../../app/views/partials/content/widgets/widget.module";
import { StoreModule } from '@ngrx/store';
import { usersReducer, UserEffects } from '../../../../../../app/core/service';
import { EffectsModule } from '@ngrx/effects';

import { UserExportDialogComponent } from '../../users/user-export-dialog/user-export-dialog.component';
import { AutoCompleteComponent } from '../../_controls/autoComplete/autoComplete.component';



// tslint:disable-next-line:class-name

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		NgxPermissionsModule.forChild(),
		FormsModule,
		ReactiveFormsModule,
		TranslateModule.forChild(),
		NgbProgressbarModule,
		PartialsModule,
		MatDialogModule,
		MatButtonModule,
		MatMenuModule,
		MatGridListModule,
		MatSelectModule,
		MatInputModule,
		MatFormFieldModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
		Select2Module,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatToolbarModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTabsModule,
		MatTooltipModule,
		MatChipsModule,
		NgbProgressbarModule,
		MatSlideToggleModule,
		ColorPickerModule,
		WidgetModule,
		MatListModule,
		MatChipsModule,
		TranslateModule.forChild(),
		StoreModule.forFeature("users", usersReducer),
		EffectsModule.forFeature([UserEffects]),
		NgbAlertModule

	],
	providers: [DatePipe],
	entryComponents: [UserExportDialogComponent],
	declarations: [
		UserExportDialogComponent,
		AutoCompleteComponent

	],
	exports: [
		MatChipsModule,
		StoreModule,
		EffectsModule,
		TranslateModule,
		NgbProgressbarModule,
		PartialsModule,
		MatDialogModule,
		MatButtonModule,
		MatMenuModule,
		MatSelectModule,
		MatToolbarModule,
		MatInputModule,
		MatFormFieldModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTabsModule,
		MatTooltipModule,
		NgbProgressbarModule,
		MatSlideToggleModule,
		ColorPickerModule,
		WidgetModule,
		MatListModule,
		MatChipsModule,
		MatChipList,
		AutoCompleteComponent,
		UserExportDialogComponent,
	],
})
export class SharedModule { }
