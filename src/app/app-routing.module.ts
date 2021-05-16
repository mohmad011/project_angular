
// import { IndustriesResolver } from "./views/pages/apps/users/industries.resolver";
// Angular
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// Components
import { BaseComponent } from "./views/theme/base/base.component";
import { ErrorPageComponent } from "./views/theme/content/error-page/error-page.component";
// Auth
import { AdminGuard, AuthGuard } from "./core/auth";

const routes: Routes = [
	{
		path: "auth",
		loadChildren: () =>
			import("../app/views/pages/auth/auth.module").then(
				(m) => m.AuthModule
			),
	},
	{
		path: "",
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [

			{
				path: "admin",
				loadChildren: () =>
					import("./views/pages/apps/admin/admin.module").then(
						(m) => m.AdminModule
					),
				canActivate: [AdminGuard],
			},
			// users
			{
				path: "users",

				loadChildren: () =>
					import("./views/pages/apps/users/users.module").then(
						(m) => m.UsersModule
					),
				canActivate: [AdminGuard],
			},


			{
				path: 'banking',
				loadChildren: () =>
					import(
						"./views/pages/apps/banking/banking.module"
					).then((m) => m.BankingModule),
			},
			{
				path: 'bankMoh',
				loadChildren: () =>
					import(
						"./views/pages/apps/bankMoh/banking.module"
					).then((m) => m.BankMoh),
			},
			{
				path: "user-profile",
				loadChildren: () =>
					import(
						"./views/pages/apps/user-profile/user-info.module"
					).then((m) => m.UserProfileModule),
			}

		],
	},
	{
		path: "error/403",
		component: ErrorPageComponent,
		data: {
			type: "error-v6",
			code: 403,
			title: "403... Access forbidden",
			desc:
				"Looks like you don't have permission to access for requested page.<br> Please, contact administrator",
		},
	},
	{ path: "error/:type", component: ErrorPageComponent },
	{ path: "", redirectTo: "", pathMatch: "full" },
	{ path: "**", redirectTo: "", pathMatch: "full" },
	{ path: "**", redirectTo: "error/403", pathMatch: "full" },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
