import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { BaseApiService } from '../../_base/crud/api/baseAPI';

@Injectable()
export class ContainerService extends BaseApiService<any> {

    constructor(http: HttpClient) {
        super(http);
        this.url = '/container';
    }

	getPreSignedUrl(extension) {
		return this.http.post<any>(this.baseUrl + this.url + '/getPreSignedUrl', '\"' + extension.toString() + '\"', { headers: this.authorization()});
	}

	uploadFileToAWSS3(fileUploadUrl, contentType, file) {
		const headers = new HttpHeaders({'Content-Type': contentType});
		const req = new HttpRequest('PUT', fileUploadUrl, file, {headers: headers, reportProgress: true});
		return this.http.request(req);
	}
}
