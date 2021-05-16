import { User } from './../_models/user.model';

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProfilesServices } from '../_services';

@Injectable()
export class UsersResolver implements Resolve<User[]> {
	constructor(private api: ProfilesServices) {
	}
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> | Promise<User[]> | User[] {
		return this.api.getUserWithCaching();
	}
}
