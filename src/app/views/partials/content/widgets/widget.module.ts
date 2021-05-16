import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule, } from '@angular/material';
import { CoreModule } from '../../../../core/core.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// Datatable
import { DataTableComponent } from './general/data-table/data-table.component';
import { Widget14Component } from './widget14/widget14.component';
import { TranslateModule } from '@ngx-translate/core';
import { Widget1Component } from './widget1/widget1.component';
// General widgets

@NgModule({
	declarations: [
		DataTableComponent,
		Widget14Component,
		Widget1Component

		// Widgets
	],
	exports: [
		DataTableComponent,
		Widget14Component,
		Widget1Component
		// Widgets
	],
	imports: [
		CommonModule,
		PerfectScrollbarModule,
		MatTableModule,
		CoreModule,
		MatIconModule,
		MatButtonModule,
		MatProgressSpinnerModule,
		MatPaginatorModule,
		MatSortModule,
		TranslateModule.forChild(),
	]
})
export class WidgetModule {
}
