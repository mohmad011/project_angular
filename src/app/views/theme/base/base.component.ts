import { tap } from 'rxjs/operators';
import { subState } from './../../../core/auth/_selectors/auth.selectors';
// Angular
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
// RxJS
import { Observable, Subscription } from 'rxjs';
// Object-Path
import * as objectPath from 'object-path';
// Layout
import { LayoutConfigService,
		MenuConfigService,
		PageConfigService,
		LayoutMohConfigService,
		MenuMohConfigService,
		PageMohConfigService
	} from '../../../core/_base/layout';
import { HtmlClassService } from '../html-class.service';
import { LayoutConfig } from '../../../core/_config/layout.config';
import { MenuConfig } from '../../../core/_config/menu.config';
import { PageConfig } from '../../../core/_config/page.config';

import { LayoutMohConfig } from '../../../core/_config/layout-moh.config';
import { MenuMohConfig } from '../../../core/_config/menu-moh.config';
import { PageMohConfig } from '../../../core/_config/page-moh.config';

// User permissions
import { NgxPermissionsService } from 'ngx-permissions';
import { currentUserPermissions, AuthService } from '../../../core/auth';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../core/reducers';

@Component({
	selector: 'kt-base',
	templateUrl: './base.component.html',
	styleUrls: ['./base.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class BaseComponent implements OnInit, OnDestroy {
	// Public variables
	selfLayout: string;
	asideDisplay: boolean;
	asideSecondary: boolean;
	subheaderDisplay: boolean;
	desktopHeaderDisplay: boolean;
	fitTop: boolean;
	fluid: boolean;
	state: any;

	selfLayout1: string;
	asideDisplay1: boolean;
	asideSecondary1: boolean;
	subheaderDisplay1: boolean;
	desktopHeaderDisplay1: boolean;
	fitTop1: boolean;
	fluid1: boolean;
	state1: any


	// Private properties
	private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
	private currentUserPermissions$: Observable<string[]>;


	/**
	 * Component constructor
	 *
	 * @param layoutConfigService: LayoutConfigService
	 * @param menuConfigService: MenuConfifService
	 * @param pageConfigService: PageConfigService
	 * @param htmlClassService: HtmlClassService
	 * @param store
	 * @param permissionsService
	 */
	constructor(
		private layoutConfigService: LayoutConfigService,
		private menuConfigService: MenuConfigService,
		private pageConfigService: PageConfigService,

		private layoutMohConfigService: LayoutMohConfigService,
		private menuMohConfigService: MenuMohConfigService,
		private pageMohConfigService: PageMohConfigService,

		private htmlClassService: HtmlClassService,
		private store: Store<AppState>,
		private permissionsService: NgxPermissionsService,
		private authService: AuthService,
	) {
		this.loadRolesWithPermissions();
		const userType = this.authService.currentUserType;
		this.store.pipe(select(subState), tap(res => {
			this.state = res
		})
		).subscribe();
		// register configs by demos
		this.layoutConfigService.loadConfigs(new LayoutConfig().configs);
		this.menuConfigService.loadConfigs(new MenuConfig().configs, userType);
		this.pageConfigService.loadConfigs(new PageConfig().configs);

		this.layoutMohConfigService.loadConfigs(new LayoutMohConfig().configs);
		this.menuMohConfigService.loadConfigs(new MenuMohConfig().configs, userType);
		this.pageMohConfigService.loadConfigs(new PageMohConfig().configs);
		// setup element classes
		this.htmlClassService.setConfig(this.layoutConfigService.getConfig());
		this.htmlClassService.setConfig(this.layoutMohConfigService.getConfig());

		const subscr1 = this.layoutConfigService.onConfigUpdated$.subscribe(layoutConfig => {
			// reset body class based on global and page level layout config, refer to html-class.service.ts
			document.body.className = '';
			this.htmlClassService.setConfig(layoutConfig);
		});
		this.unsubscribe.push(subscr1);

		const subscr2 = this.layoutMohConfigService.onConfigUpdated$.subscribe(layoutConfig => {
			// reset body class based on global and page level layout config, refer to html-class.service.ts
			document.body.className = '';
			this.htmlClassService.setConfig(layoutConfig);
		});
		this.unsubscribe.push(subscr2);
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		const config = this.layoutConfigService.getConfig();
		this.selfLayout = objectPath.get(config, 'self.layout');
		this.asideDisplay = objectPath.get(config, 'aside.self.display');
		this.subheaderDisplay = objectPath.get(config, 'subheader.display');
		this.desktopHeaderDisplay = objectPath.get(config, 'header.self.fixed.desktop');
		this.fitTop = objectPath.get(config, 'content.fit-top');
		this.fluid = objectPath.get(config, 'content.width') === 'fluid';

		// let the layout type change
		const subscr1 = this.layoutConfigService.onConfigUpdated$.subscribe(cfg => {
			setTimeout(() => {
				this.selfLayout = objectPath.get(cfg, 'self.layout');
			});
		});
		this.unsubscribe.push(subscr1);


		const config1 = this.layoutMohConfigService.getConfig();
		this.selfLayout1 = objectPath.get(config1, 'self.layout');
		this.asideDisplay1 = objectPath.get(config1, 'aside.self.display');
		this.subheaderDisplay1 = objectPath.get(config1, 'subheader.display');
		this.desktopHeaderDisplay1 = objectPath.get(config1, 'header.self.fixed.desktop');
		this.fitTop1 = objectPath.get(config1, 'content.fit-top');
		this.fluid1 = objectPath.get(config1, 'content.width') === 'fluid';

		const subscr2 = this.layoutMohConfigService.onConfigUpdated$.subscribe(cfg => {
			setTimeout(() => {
				this.selfLayout1 = objectPath.get(cfg, 'self.layout');
			});
		});
		this.unsubscribe.push(subscr2);
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.unsubscribe.forEach(sb => sb.unsubscribe());
	}

	/**
	 * NGX Permissions, init roles
	 */
	loadRolesWithPermissions() {
		// let token: any = localStorage.getItem('authTokenKey')
		// if (token) {
		// 	token = JSON.parse(token)
		// 	this.permissionsService.addPermission(token.role)
		// }
		this.currentUserPermissions$ = this.store.pipe(select(currentUserPermissions));
		const subscr = this.currentUserPermissions$.subscribe(res => {
			if (!res || res.length === 0) {
				return;
			}

			this.permissionsService.flushPermissions();
			this.permissionsService.addPermission(res)
			// res.forEach((pm: string) => {
			// 	console.log('loadRolesWithPermissions', pm)
			// 	this.permissionsService.addPermission(pm)
			// }
			//);
		});
		this.unsubscribe.push(subscr);
	}
}
