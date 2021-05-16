// Angular
import { Injectable } from '@angular/core';
// RxJS
import { Subject } from 'rxjs';
// Object-Path
import * as objectPath from 'object-path';
// Lodash
import { merge } from 'lodash';
// Models
import { LayoutMohConfigModel } from '../models/layout-moh-config.model';

@Injectable()
export class LayoutMohConfigService {
	// Public properties
	onConfigUpdated$: Subject<LayoutMohConfigModel>;
	layoutMohConfig: LayoutMohConfigModel;

	/**
	 * Servcie constructor
	 */
	constructor() {
		// register on config changed event and set default config
		this.onConfigUpdated$ = new Subject();
	}

	/**
	 * Save layout config to the local storage
	 * @param layoutMohConfig
	 */
	saveConfig(layoutMohConfig: LayoutMohConfigModel): void {
		if (layoutMohConfig) {
			localStorage.setItem('layoutMohConfig', JSON.stringify(layoutMohConfig));
		}
	}

	/**
	 * Get layout config from local storage
	 */
	getSavedConfig(): LayoutMohConfigModel {
		const config = localStorage.getItem('layoutMohConfig');
		try {
			return JSON.parse(config);
		} catch (e) {
		}
	}

	/**
	 * Remove saved layout config and revert back to default
	 */
	resetConfig(): void {
		localStorage.removeItem('layoutMohConfig');
	}

	/**
	 * Get all config or by object path
	 * @param path | object path separated by dot
	 */
	getConfig(path?: string): LayoutMohConfigModel | any {
		// merge default layout config with the saved config from layout storage
		// @todo; known issue; viewing 2 or more demos at the time in different browser's tabs, can cause conflict to the layout config
		this.layoutMohConfig = this.getSavedConfig();

		if (path) {
			// if path is specified, get the value within object
			return objectPath.get(this.layoutMohConfig, path);
		}

		return this.layoutMohConfig;
	}

	/**
	 * Set existing config with a new value
	 * @param value
	 * @param save
	 */
	setConfig(value: any, save?: boolean): void {
		this.layoutMohConfig = merge(this.layoutMohConfig, value);

		if (save) {
			this.saveConfig(this.layoutMohConfig);
		}

		// fire off an event that all subscribers will listen
		this.onConfigUpdated$.next(this.layoutMohConfig);
	}

	/**
	 * Get brand logo
	 */
	getLogo(): string {
		const menuAsideLeftSkin = objectPath.get(this.layoutMohConfig, 'brand.self.skin');
		// set brand logo
		const logoObject = objectPath.get(this.layoutMohConfig, 'self.logo');

		let logo;
		if (typeof logoObject === 'string') {
			logo = logoObject;
		}
		if (typeof logoObject === 'object') {
			logo = objectPath.get(logoObject, menuAsideLeftSkin + '');
		}
		if (typeof logo === 'undefined') {
			try {
				const logos = objectPath.get(this.layoutMohConfig, 'self.logo');
				logo = logos[Object.keys(logos)[0]];
			} catch (e) {
			}
		}
		return logo;
	}

	/**
	 * Returns sticky logo
	 */
	getStickyLogo(): string {
		let logo = objectPath.get(this.layoutMohConfig, 'self.logo.sticky');
		if (typeof logo === 'undefined') {
			logo = this.getLogo();
		}
		return logo + '';
	}

	/**
	 * Initialize layout config
	 * @param config
	 */
	loadConfigs(config: LayoutMohConfigModel) {
		this.layoutMohConfig = this.getSavedConfig();
		// use saved config as priority, or load new config if demo does not matched
		if (!this.layoutMohConfig || objectPath.get(this.layoutMohConfig, 'demo') !== config.demo) {
			this.layoutMohConfig = config;
		}
		this.saveConfig(this.layoutMohConfig);
	}

	/**
	 * Reload current layout config to the state of latest saved config
	 */
	reloadConfigs(): LayoutMohConfigModel {
		this.layoutMohConfig = this.getSavedConfig();
		this.onConfigUpdated$.next(this.layoutMohConfig);
		return this.layoutMohConfig;
	}
}
