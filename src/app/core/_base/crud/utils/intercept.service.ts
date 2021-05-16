// Angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * More information there => https://medium.com/@MetonymyQT/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
 */
@Injectable()
export class InterceptService implements HttpInterceptor {
	// intercept request and add token
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		// tslint:disable-next-line:no-debugger
		// modify request
		// request = request.clone({
		// 	setHeaders: {
		// 		Authorization: `Bearer ${localStorage.getItem('accessToken')}`
		// 	}
		// });
		// console.log('----request----');
		// console.log(request);
		// console.log('--- end of request---');

		return next.handle(request).pipe(
			tap(
				event => {
					 if (event instanceof HttpResponse) {
						// console.log('all looks good');
						// http response status code
						// console.log(event.status);
						//console.error('InterceptService', event);

					}
				},
				error => {
					// http response status code
					// console.log('----response----');
					console.error(error, request.url);
					// tslint:disable-next-line:no-debugger
					if (error.status == 401 || error.status == 403)
					{
						if (request.url.indexOf('auth/login') == -1)
						{ location.reload(); }
					}
					console.error('InterceptService', error.status);
					console.error('InterceptService', error.message);
					// console.log('--- end of response---');
				}
			)
		);
	}
}
