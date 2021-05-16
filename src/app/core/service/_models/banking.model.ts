import { BaseModel } from '../../_base/crud';

export class Banking {
	id?: string;
	title?: string;
	authorizeLoginID?: string;
	authorizeKey?: string;
	limit?: number;
	blockedPINS: string[];
}
