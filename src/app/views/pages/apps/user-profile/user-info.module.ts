// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

// Material

// Translate Module
import { TranslateModule } from "@ngx-translate/core";

import { NgbProgressbarModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPermissionsModule } from "ngx-permissions";
import { SharedModule } from "../admin/shared/shared.module";
import { UserInfoComponent } from './user-info/user-info.component';

// NGRX
// UI
// Auth
// Core => Services
// Core => Utils
const routes: Routes = [
	{
		path: "",
		component: UserInfoComponent,
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
	providers: [],
	entryComponents: [],
	declarations: [
		UserInfoComponent
		],
})
export class UserProfileModule {}
