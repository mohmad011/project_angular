import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user.model';
import { catchError, map, tap, shareReplay } from 'rxjs/operators';
import { QueryParamsModel, QueryResultsModel } from '../../_base/crud';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { BaseApiService } from '../../_base/crud/api/baseAPI';


//const API_USERS_URL = 'api/users';
const API_USERS_URL = environment.baseUrl;
const API_PERMISSION_URL = 'api/permissions';
const API_ROLES_URL = 'api/roles';
const API_TOKEN = 'authTokenKey';

const cache = new Map();
@Injectable()
export class AdminsService extends BaseApiService<any>{

    constructor(http: HttpClient) {
        super(http);
        this.url = '/admins'
    }

    // DELETE => delete the user from the server
    deleteUser(userId: string) {
        const user = { id: userId, isDeleted: true }
        return this.save(user)
    }

    // UPDATE => PUT: update the user on the server
    updateUser(_user: User): Observable<any> {
        return this.http.patch(API_USERS_URL + `${this.url}`, _user, { headers: this.authorization() });
    }

    // CREATE =>  POST: add a new user to the server
    createUser(user: User): Observable<User> {
        return this.http.post<User>(API_USERS_URL + `${this.url}`, user, { headers: this.authorization() });
    }

    // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
    // items => filtered/sorted result
    findUser(userId): Observable<QueryResultsModel> {
        return this.http.get<QueryResultsModel>(API_USERS_URL + `${this.url}/` + userId, { headers: this.authorization() });
    }
    searchUsers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
        return this.http.post<QueryResultsModel>(API_USERS_URL + `${this.url}/`, queryParams, { headers: this.authorization() });
    }

}
