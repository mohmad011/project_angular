
// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

// Material

// Translate Module
import { TranslateModule } from "@ngx-translate/core";

import { MohListComponent } from './listMoh/listMoh.component';
import { MohFormComponent } from './formMoh/formMoh.component';
import { NgbProgressbarModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPermissionsModule } from "ngx-permissions";
import { SharedModule } from "../admin/shared/shared.module";

import { BankingService } from "../../../../core/service/_services";
import { BankMohService } from "../../../../core/service/_services";


// NGRX
// UI
// Auth
// Core => Services
// Core => Utils
const routes: Routes = [
	{
		path: '',
		component: MohListComponent,
		canActivate: [],
	},
	// user profile
	{
		path: 'new',
		component: MohFormComponent,
		canActivate: [],
	},
	{
		path: 'edit/:id',
		component: MohFormComponent,
		canActivate: [],
	},
];

// tslint:disable-next-line:class-name

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		NgxPermissionsModule.forChild(),
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild(routes),
		NgbProgressbarModule,
		SharedModule,
	],
	providers: [
		BankMohService
	],
	entryComponents: [],
	declarations: [
		MohFormComponent,
		MohListComponent
	],
})
export class BankMoh { }

