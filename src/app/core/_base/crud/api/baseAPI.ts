/**
 * Created by iAboShosha on 7/13/17.
 */
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseModel } from '../models/_base.model';
import { environment } from '../../../../../environments/environment';

export class BaseApiService<T extends BaseModel> {
	public baseUrl = environment.baseUrl;
	public url = '/';
	public lookupFields = ['name', 'name_ar']
	constructor(protected http: HttpClient) { }

	protected authorization(): HttpHeaders {
		const token = JSON.parse(localStorage.getItem('authTokenKey'));

		if (token)
		{
			return new HttpHeaders()
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json')
				.set('Authorization', 'Bearer ' + token.token);
		} else
		{
			return new HttpHeaders()
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json');
		}
	}

	query(query: any = null): Observable<any> {
		const filter = query ? '?filter=' + `${JSON.stringify(query)}` : '';
		return this.http.get<T>(
			this.baseUrl + this.url + filter,
			{ headers: this.authorization() }
		);
	}

	lookup(text, extra = []): Observable<T> {
		return this.query({
			where: {
				and: [

					{
						or: this.lookupFields.map(x => {
							let filter = {};
							filter[x] = { like: `${text}.*`, options: 'i' }
							return filter;
						})
					},
					...extra,
				]

			}
		})
	}

	queryByObject(query: any) {
		return this.http.get<T[]>(
			this.baseUrl + this.url + '?filter=' + `${JSON.stringify(query)}`,
			{ headers: this.authorization() }
		);
	}

	countByObject(query: any) {
		return this.http.get<T[]>(
			this.baseUrl +
			this.url +
			'/count/' +
			'?where=' +
			`${JSON.stringify(query)}`,
			{ headers: this.authorization() }
		);
	}

	get(id: string) {
		return this.http.get<T>(this.baseUrl + this.url + `/${id}`, {
			headers: this.authorization()
		});
	}
	getWithFilter(id: string, query) {
		return this.http.get<T>(
			this.baseUrl + this.url + `/${id}?filter=${JSON.stringify(query)}`,
			{ headers: this.authorization() }
		);
	}

	save(item: any) {
		return item.id ? this.update(item) : this.add(item);
	}

	add(item: T) {
		return this.http.post<T>(this.baseUrl + this.url, item, {
			headers: this.authorization()
		});
	}

	update(item: any) {
		return this.http.patch<T>(
			this.baseUrl + this.url + `/${item.id}`,
			item,
			{ headers: this.authorization() }
		);
	}

	// only for POST /users/update Update instances of the model matched by {{where}} from the data source
	updateWithWhere(query: any, item: T) {
		return this.http.post<T[]>(
			this.baseUrl + this.url + '/update?where=' + `${query}`,
			item,
			{ headers: this.authorization() }
		);
	}

	destroy(id: String): Observable<any> {
		return this.http.delete<T>(this.baseUrl + this.url + `/${id}`, {
			headers: this.authorization()
		});
	}

	export(where, fieldsArr, order) {
		let fields = {};
		fieldsArr.forEach(element => {
			fields[element] = 1
		});
		let filter = {
			where,
			fields, order
		};

		window.open(`${this.baseUrl + this.url}/csv${`?filter=${JSON.stringify(filter)}`}`)
	}
	exportPdf(id) {
		window.open(`${this.baseUrl + this.url}/img?id=` + id);
	}

	upload(file: File): Observable<any> {
		const formData: FormData = new FormData();
		formData.append('file', file, file.name);
		const headers = new HttpHeaders();
		headers.append('path', file.name);
		const apiUrl = '/Containers/MProve-app/upload';

		return this.http.post(this.baseUrl + apiUrl, formData)
			.pipe(
				map(m => {
					return {
						path: m["result"].files.file[0].providerResponse.location,
						originalFilename:
							m["result"].files.file[0].originalFilename,
						name: m["result"].files.file[0].providerResponse.name
					};
				})
			);
	}

	/*
	 * Handle Http operation that failed.
	 * Let the app continue.
   *
   * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T>(operation = 'operation', result?: any) {
		return (error: any): Observable<any> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// Let the app keep running by returning an empty result.
			return of(result);
		};
	}
}
