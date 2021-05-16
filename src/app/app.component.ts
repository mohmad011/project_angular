import { Subscription } from 'rxjs';
// Angular
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';

// Layout
import { LayoutConfigService, SplashScreenService, TranslationService } from './core/_base/layout';
// language list
import { locale as enLang } from './core/_config/i18n/en';
import { locale as arLang } from './core/_config/i18n/ar';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'body[kt-root]',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
	// Public properties
	title = 'ThinKloud';
	loader: boolean;
	languages: any = [];
	private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param translationService: TranslationService
	 * @param router: Router
	 * @param layoutConfigService: LayoutCongifService
	 * @param splashScreenService: SplashScreenService
	 */
	constructor(private translationService: TranslationService,
		private translate: TranslateService,
		private router: Router,
		private titleService: Title,
		private activatedRoute: ActivatedRoute,
		private layoutConfigService: LayoutConfigService,
		private splashScreenService: SplashScreenService) {

		// register translations
		this.translationService.loadTranslations(enLang, arLang);
		const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));

		// Change page title on navigation or language change, based on route data
		merge(this.translate.onLangChange, onNavigationEnd)
			.pipe(
				map(() => {
					let route = this.activatedRoute;
					while (route.firstChild) {
						route = route.firstChild;
					}
					return route;
				}),
				filter(route => route.outlet === 'primary'),
				mergeMap(route => route.data)
			)
			.subscribe(event => {
				const title = event['title'];
				if (title) {
					this.titleService.setTitle(this.translate.instant(title));
				}
			});
	}
	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		// enable/disable loader
		this.loader = this.layoutConfigService.getConfig('loader.enabled');

		const routerSubscription = this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				// hide splash screen
				this.splashScreenService.hide();

				// scroll to top on every route change
				window.scrollTo(0, 0);

				// to display back the body content
				setTimeout(() => {
					document.body.classList.add('kt-page--loaded');
				}, 500);
			}
		});
		this.unsubscribe.push(routerSubscription);
	}

	/**
	 * On Destroy
	 */
	ngOnDestroy() {
		this.unsubscribe.forEach(sb => sb.unsubscribe());
	}
}
