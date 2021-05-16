import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from '../admin/shared/shared.module';
import { UsersListComponent } from './list/list.component';
import { UserFormComponent } from './form/form.component';
import { InternationalPhoneModule, CountryService } from 'ng4-intl-phone';

const routes: Routes = [
	{
		path: '',
		component: UsersListComponent,
		canActivate: [],
	},
	{
		path: 'new',
		component: UserFormComponent,
		canActivate: [],
		resolve: {
		}
	},
	{
		path: 'edit/:id',
		component: UserFormComponent,
		canActivate: [],
		resolve: {
		}
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
		InternationalPhoneModule
	],
	providers: [

	],
	entryComponents: [],
	declarations: [
		UsersListComponent,
		UserFormComponent
	],
})
export class UsersModule { }

CountryService.prototype.getCountries = function () {
	return this.countries.filter(x => x.countryCode != 'il');
};
