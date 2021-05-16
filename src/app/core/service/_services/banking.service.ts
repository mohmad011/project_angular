import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '../../_base/crud/api/baseAPI';
import { Banking } from '../_models/banking.model';


@Injectable()
export class BankingService extends BaseApiService<any> {

    constructor(http: HttpClient) {
        super(http);
        this.url = '/bankingSettings';
    }

}
