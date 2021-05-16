// Angular
import { Injectable } from '@angular/core';
// Tranlsation
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { environment } from '../../../../../environments/environment';

export interface Locale {
	lang: string;
	// tslint:disable-next-line:ban-types
	data: Object;
}

@Injectable({
	providedIn: 'root'
})
export class TranslationService {
	// Private properties
	private langIds: any = [];

	/**
	 * Service Constructor
	 *
	 * @param translate: TranslateService
	 */
	constructor(private translate: TranslateService) {
		// add new langIds to the list
		this.translate.addLangs([environment.defaultLanguage]);

		// this language will be used as a fallback when a translation isn't found in the current language
		this.translate.setDefaultLang(environment.defaultLanguage);
	}

	/**
	 * Load Translation
	 *
	 * @param args: Locale[]
	 */
	loadTranslations(...args: Locale[]): void {
		const locales = [...args];

		locales.forEach(locale => {
			// use setTranslation() with the third argument set to true
			// to append translations instead of replacing them
			this.translate.setTranslation(locale.lang, locale.data, true);

			this.langIds.push(locale.lang);
		});

		// add new languages to the list
		this.translate.addLangs(this.langIds);
		this.translate.onLangChange
		.subscribe((event: LangChangeEvent) => {
			localStorage.setItem('language', event.lang);
			if (event.lang == 'en') {
				document.getElementById('html').setAttribute('lang', 'en');
				document.getElementById('html').setAttribute('dir', 'ltr');
				document.getElementById('html').setAttribute('direction', 'ltr');
				document.getElementById('html').setAttribute('style', "direction: ltr ;");
				document.getElementById('_body').setAttribute('style', "text-align: left !important;");
			}
			else {
				document.getElementById('html').setAttribute('lang', 'ar');
				document.getElementById('html').setAttribute('dir', 'rtl');
				document.getElementById('html').setAttribute('direction', 'rtl');
				document.getElementById('html').setAttribute('style', "direction: rtl");
				document.getElementById('_body').setAttribute('style', "text-alight: right !important; ");
			}
		});
	}

	/**
	 * Setup language
	 *
	 * @param lang: any
	 */
	setLanguage(lang) {
		if (lang) {
			this.translate.use(lang);
		}
	}

	/**
	 * Returns selected language
	 */
	getSelectedLanguage(): any {
		return localStorage.getItem('language') || this.translate.getDefaultLang();
    }
}
