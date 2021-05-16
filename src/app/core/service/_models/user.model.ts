import { BaseModel } from '../../_base/crud';

export class User {
	id?: number;
	isDeleted: boolean;
	username?: string;
	name: string;
	title?: string;
	firstName?: string;
	middleName?: string;
	lastName?: string;
	company?: string;
	position?: string;
	industry?: string;
	about?: string;
	interests?: string[];
	password?: string;
	email?: string;
	accessToken?: string;
	refreshToken?: string;
	roles?: number[];
	fullName?: string;
	occupation?: string;
	companyName?: string;
	mobile?: string;
	Address?: string;
	type?: string;
	commercialNumber?: string;
	taxNumber?: string;
	avatar?: string;
	gender?: string;
	cityId?: string;
	region?: string;
	countryId?: string;
	dateOfBirth: Date;
	profileId?: string;
	language?: string;
	role?: string;
	timeFormat?: string;
	timeZone?: string;
	clear(): void {
		this.id = undefined;
		this.username = '';
		this.title = '';
		this.firstName = '';
		this.middleName = '';
		this.lastName = '';
		this.password = '';
		this.email = '';
		this.type = '';
		this.roles = [];
		this.fullName = '';
		this.accessToken = 'access-token-' + Math.random();
		this.refreshToken = 'access-token-' + Math.random();
		this.industry = '';
		this.company = '';
		this.mobile = '';
		this.position = '';
		this.interests = [];
		this.occupation = '';
		this.companyName = '';
		this.mobile = '';
		this.Address = '';
		this.timeFormat = '';
		this.language = 'en';

	}
}
