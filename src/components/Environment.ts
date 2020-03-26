import environmentLocal from "../../config/environment.local";
import environmentDevelopment from "../../config/environment.development";
import environmentProduction from "../../config/environment.production";
import environmentTest from "../../config/environment.test";

export interface Environment {
    openCage:{
        api_key: string
    }
}
let e: Environment;
switch(process.env.NODE_ENV) {
    case 'local': e = environmentLocal; break;
    case 'development': e = environmentDevelopment; break;
    case 'production': e = environmentProduction; break;
    case 'test': e = environmentTest; break;
}
export const Config = e;
