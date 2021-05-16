
import { BaseApiService } from '../../../../../core/_base/crud/api/baseAPI';


export interface IOptionSource {

    multiple: boolean;
    limit: number;
    key: any[];
    placeHolder: string;
    display: string | Function;
    sourceApi: BaseApiService<any>;
}
