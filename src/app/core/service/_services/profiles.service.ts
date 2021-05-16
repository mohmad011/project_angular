import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user.model';
import { map, tap, shareReplay } from 'rxjs/operators';
import { QueryParamsModel, QueryResultsModel } from '../../_base/crud';
import { environment } from '../../../../environments/environment';
import { BaseApiService } from '../../_base/crud/api/baseAPI';

const cache = new Map();

//const API_USERS_URL = 'api/users';
const API_USERS_URL = environment.baseUrl;
const API_TOKEN = 'authTokenKey';

@Injectable()
export class ProfilesServices extends BaseApiService<any>{

	constructor(http: HttpClient) {
		super(http);
		this.url = '/profiles'
		this.lookupFields = ['firstName', 'lastName', 'email', 'middleName']
	}



	// UPDATE => PUT: update the user on the server
	updateUser(_user: User): Observable<any> {
		return this.http.patch(API_USERS_URL + `${this.url}`, _user, { headers: this.authorization() });
	}
	updateProfile(_user: User, shop): Observable<any> {
		return this.http.patch(API_USERS_URL + `${this.url}`, _user, { headers: this.authorization() });
	}

	// CREATE =>  POST: add a new user to the server
	createUser(user: User): Observable<User> {
		return this.http.post<User>(API_USERS_URL + `${this.url}/signup`, { data: user }, { headers: this.authorization() });
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	findUser(userId): Observable<QueryResultsModel> {
		return this.get(userId + '?filter={"include":"user"}')
	}
	searchUsers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		return this.http.post<QueryResultsModel>(API_USERS_URL + `${this.url}/`, queryParams, { headers: this.authorization() });
	}

	findUsers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		const httpHeaders = new HttpHeaders();
		httpHeaders.set('Content-Type', 'application/json');
		return this.http.post<QueryResultsModel>(API_USERS_URL + `${this.url}/` + '/findUsers', queryParams, { headers: httpHeaders });
	}
	countByObject(query: any) {
		return this.http
			.get<any>(this.baseUrl + this.url + '/count/' + '?where=' + `${JSON.stringify(query)}`, { headers: this.authorization() })
	}

	changeMobile(userId, mobile) {
		return this.http.post<any>(API_USERS_URL + this.url + '/change-mobile', { mobile, userId }, { headers: this.authorization() });
	}
	getUserWithCaching(): Observable<any> {
		if (cache.get('users')) {
			return cache.get('users');
		}
		const request$: Observable<any> = this.queryByObject({}).pipe(
			tap(() => cache.set('users', request$)),
			shareReplay(1)
		);
		return request$;
	}
	setCurrentUserLanguage(language) {
		const id = this.currentUserId;
		return this.save({ id, language })
	}


	me(): Observable<any> {
		const userTokenStr = localStorage.getItem(API_TOKEN);
		const userToken = JSON.parse(userTokenStr);
		if (userToken && userToken.userId) {
			return this.queryByObject({ where: { id: userToken.userId }, include: ['shop'] }).pipe(
				map(res => res && res.length > 0 ? res[0] : null)
			)
		} else {
			return of(null)
		}
	}
	get currentUserId(): string | null {
		const userTokenStr = localStorage.getItem(API_TOKEN);
		const userToken = JSON.parse(userTokenStr);
		return userToken && userToken.userId ? userToken.userId : null
	}


	lookup(text): Observable<User> {
		return this.query({
			where: {
				and: [
					{
						or: this.lookupFields.map(x => {
							let filter = {};
							filter[x] = { like: `${text}.*`, options: 'i' }
							return filter;
						})
					}
				]

			}
		})
	}
}
