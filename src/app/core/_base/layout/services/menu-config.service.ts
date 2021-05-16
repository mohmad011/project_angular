// Angular
import { Injectable } from '@angular/core';
// RxJS
import { Subject } from 'rxjs';

@Injectable()
export class MenuConfigService {
	// Public properties
	onConfigUpdated$: Subject<any>;
	// Private properties
	private menuConfig: any;

	/**
	 * Service Constructor
	 */
	constructor() {
		// register on config changed event and set default config
		this.onConfigUpdated$ = new Subject();
	}

	/**
	 * Returns the menuConfig
	 */
	getMenus() {
		return this.menuConfig;
	}

	/**
	 * Load config
	 *
	 * @param config: any
	 */
	loadConfigs(config: any , userType='', state= '') {
		// if(config && config.aside && config.aside.items){
		// 	config.aside.items = config.aside.items
		// 		.filter(m =>!!m.accessRoles && m.accessRoles.find(el=>el === userType));
		// }
		this.menuConfig = config;
		this.onConfigUpdated$.next(this.menuConfig);
	}
}
