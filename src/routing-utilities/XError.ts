import {CustomError} from "./CustomError";
export class XError extends Error {

    constructor (public CError: CustomError, public status: number, public message: string, public metaData?: any){
        super(message);
    }

    /**
     * ERRORS
     */
    static readonly RESOURCE_NOT_FOUND_ERROR = new CustomError(1, 'resource_not_found_error');
}


