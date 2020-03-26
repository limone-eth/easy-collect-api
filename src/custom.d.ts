import * as modelUser from "./db/models/Shop.model";
declare global {
    namespace Express {
        export interface Request {
            version?: string;
            requestTime?: Date;
        }
    }
}
