import { Observable, BehaviorSubject } from 'rxjs';
import { last, tap } from 'rxjs/operators';
import { HttpHeaders, HttpEventType, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';


@Injectable()
export class UploadService {

	constructor(protected http: HttpClient) { }

	public baseUrl = environment.baseUrl;

	upload(files: File[]): Observable<any> {

		const formData: FormData = new FormData();
		const headers = new HttpHeaders();
		files.forEach(file => {
			formData.append('file', file, file.name);
			headers.append('path', file.name);
		})


		const apiUrl = this.baseUrl + '/Containers/MProve-app/upload';

		let subject = new BehaviorSubject<any>({})
		this.http.post(apiUrl, formData, {
			headers: headers,
			reportProgress: true,
			observe: 'events'
		})
			.pipe(
				tap(event => {
					if ([0, 1, 4].indexOf(event.type) > -1)
						subject.next(this.getEventMessage(event))
					if (event.type == 4)
					{
						subject.complete();
					}
				}),

				last(),

			).subscribe();
		return subject.asObservable();
	}
	private getEventMessage(event: any) {
		console.log('getEventMessage', event)
		switch (event.type)
		{
			case HttpEventType.Sent://0
				return {
					type: 'progress',
					percentDone: 0
				}
			case HttpEventType.UploadProgress://1
				// Compute and show the % done:
				const percentDone = Math.round(100 * event.loaded / event.total);
				return {
					type: 'progress',
					percentDone,
					loaded: event.loaded,
					total: event.total
				};

			case HttpEventType.Response://4
				let response = event.body["result"].files.file;

				return {
					type: 'result',
					files: response.map(f => ({
						path: f.providerResponse.location,
						originalFilename: f.originalFilename,
						name: f.providerResponse.name
					}))
				};
		}
	}
}
