import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { BaseApiService } from '../../_base/crud/api/baseAPI';
import { Admin } from '../../service';

//const API_USERS_URL = 'api/users';
const API_USERS_URL = environment.baseUrl;
const API_TOKEN = 'authTokenKey';


@Injectable()
export class AuthService extends BaseApiService<Admin>{

	constructor(http: HttpClient) {
		super(http);
		this.url = '/auth'
	}
	// Authentication/Authorization

	login(userNme: string, password: string): Observable<any> {
		let credential;
		if (this.isEmail(userNme)) {
			credential = { email: userNme, password: password }
		} else {
			credential = { username: userNme, password: password, mobile: userNme }
		}
		return this.http.post<Admin>(API_USERS_URL + `${this.url}/login/`, credential, { headers: this.authorization() });
	}

	getUserByToken(): Observable<any> {
		const userTokenStr = localStorage.getItem(API_TOKEN);
		const userToken = JSON.parse(userTokenStr);
		return this.http.get(this.baseUrl + '/auth/me', {
			headers: this.authorization()
		}).pipe(
			catchError(err => of(null)),
			tap(e => { if (e) { e.role = userToken.role } })
		);
	}
	changeMobile(userId, mobile) {
		return this.http.post<any>(API_USERS_URL + this.url + '/change-mobile', { mobile, userId }, { headers: this.authorization() });
	}
	changeEmail(userId, email) {
		return this.http.post<any>(API_USERS_URL + this.url + '/change-email', { email, userId }, { headers: this.authorization() });
	}

	register(user: Admin): Observable<any> {
		return this.http.post<Admin>(API_USERS_URL + `auth/signup`, user, { headers: this.authorization() })
			.pipe(
				map((res: Admin) => {
					return res;
				})
			);
	}

	logOut(): Observable<any> {
		const userTokenStr = localStorage.getItem(API_TOKEN);
		const httpHeaders = new HttpHeaders();
		const userToken = JSON.parse(userTokenStr);
		localStorage.removeItem(API_TOKEN);
		httpHeaders.set('Authorization', 'Bearer ' + userToken.token);
		return this.http.post<Admin>(`${API_USERS_URL}${this.url}/logout/${userToken.token}`, null, { headers: httpHeaders });
	}

    /*
     * Submit forgot password request
     *
     * @param {string} email
     * @returns {Observable<any>}
     */
	public requestPassword(email: string): Observable<any> {
		return this.http.post(`${API_USERS_URL}${this.url}/email/forget-password`, { email, headers: this.authorization() })
	}

	public reset(newPassword: string, code: string): Observable<any> {
		return this.http.post(`${API_USERS_URL}${this.url}/email/set-password`, { password: newPassword, vcode: code, headers: this.authorization() })
	}

	get currentUserType() {
		const userTokenStr = localStorage.getItem(API_TOKEN);
		const userToken = JSON.parse(userTokenStr);
		return userToken && userToken.role ? userToken.role : '';
	}
	me(): Observable<Admin> {
		const userTokenStr = localStorage.getItem(API_TOKEN);
		const userToken = JSON.parse(userTokenStr);
		return this.get(userToken.userId)
	}

	isEmail(value): boolean {
		const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return !!reg.test(value)
	}
}
