import { BaseModel } from '../../_base/crud';

export class Admin extends BaseModel {
	id?: number;
	isDeleted?: boolean;
	username?: string;
	// firstName?: string;
	// lastName?: string;
	password?: string;
	email?: string;
	accessToken?: string;
	refreshToken?: string;
	roles?: number[];
	fullname?: string;
	occupation?: string;
	// companyName?: string;
	mobile?: string;
	Address?: string;
	type?: string;
	avatar?: string;
	language?: string;
	dateOfBirth?: any;
	role?: string;
	clear(): void {
		this.id = undefined;
		this.username = '';
		// this.firstName = '';
		// this.lastName = '';
		this.password = '';
		this.email = '';
		this.role = '';
		this.roles = [];
		this.accessToken = 'access-token-' + Math.random();
		this.refreshToken = 'access-token-' + Math.random();
		this.occupation = '';
		// this.companyName = '';
		this.mobile = '';
		// this.Address = '';
		this.language = 'en';

	}
}
