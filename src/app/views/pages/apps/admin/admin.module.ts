// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

// Material
import { MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material";

import { NgxPermissionsModule } from "ngx-permissions";

// Auth
import { ModuleGuard, AdminGuard } from "../../../../core/auth";
// Core => Services
// Core => Utils
import {
	HttpUtilsService,
	TypesUtilsService,
	InterceptService,
	LayoutUtilsService,
} from "../../../../core/_base/crud";
// Shared
import {
	ActionNotificationComponent,
	DeleteEntityDialogComponent,
	FetchEntityDialogComponent,
	UpdateStatusDialogComponent,
} from "../../../partials/content/crud";

import {
	UsersService,
} from "../../../../core/service/_services";


import { UsersResolver } from "../../../../core/service/_resolvers/users-resolver";
import { AdminComponent } from "./admin.component";

import { SharedModule } from "./shared/shared.module";
import { AdminsListComponent } from './list/list.component';
import { AdminsFormComponent } from './form/form.component';

// tslint:disable-next-line:class-name
const routes: Routes = [
	// <editor-fold desc="Event">
	{
		path: '',
		component: AdminsListComponent,

	},
	{
		path: 'new',
		component: AdminsFormComponent,
		canActivate: [],
	},
	{
		path: 'edit/:id',
		component: AdminsFormComponent,
		canActivate: [],
	},
];
@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		HttpClientModule,
		NgxPermissionsModule.forChild(),

		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild(routes),
	],
	providers: [
		ModuleGuard,
		AdminGuard,
		InterceptService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptService,
			multi: true,
		},
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS,
			useValue: {
				hasBackdrop: false,
				panelClass: "kt-mat-dialog-container__wrapper",
				height: "auto",
				width: "900px",
			},
		},
		TypesUtilsService,
		LayoutUtilsService,
		HttpUtilsService,
		TypesUtilsService,
		LayoutUtilsService,
		UsersService,
		UsersResolver,
	],
	entryComponents: [
		ActionNotificationComponent,
		DeleteEntityDialogComponent,
		FetchEntityDialogComponent,
		UpdateStatusDialogComponent,
	],
	declarations: [
		AdminComponent,
		AdminsListComponent,
		AdminsFormComponent
	],
})
export class AdminModule { }
