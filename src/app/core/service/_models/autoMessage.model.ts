import { BaseModel } from '../../_base/crud';

export class AutoMessage {
	id?: string;
	message?: string;
	paymentMethod?: {};
	paymentSlug?: string;
	order?: string;
}
