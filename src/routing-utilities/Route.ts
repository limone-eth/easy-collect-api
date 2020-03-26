import {RequestController} from "./RequestController";
import {MethodRoutes} from "./AbstractRoutes";

export class Route {

    constructor(public method: MethodRoutes, public endpoint: string, public classes: { [key: string]: RequestController }, public requestedRole?: string[] | string) {

    }
}
