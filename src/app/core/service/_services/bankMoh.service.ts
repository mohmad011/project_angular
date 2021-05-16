import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '../../_base/crud/api/baseAPI';
import { BankMoh } from '../_models/bankMoh.model';

@Injectable()
export class BankMohService extends BaseApiService<any> {

    constructor(http: HttpClient) {
        super(http);
        this.url = '/job-advs';
    }

}
