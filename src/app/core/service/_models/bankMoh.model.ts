import { BaseModel } from '../../_base/crud';

export class BankMoh {
	id?: string;
	title?: string;
	description?: string;
	active?: boolean;
	availablePositions?: number;
	post_date?: string;
}
