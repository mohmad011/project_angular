import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseApiService } from "../../_base/crud/api/baseAPI";

@Injectable()
export class ImagesService extends BaseApiService<any> {
	constructor(http: HttpClient) {
		super(http);
		this.url = "/image-infos";
	}

	imageVision(hash: string, trade: string) {
		return this.http.post<any>(
			this.baseUrl + this.url + `/vision/${trade}/${hash}`,
			null
		);
	}
}
