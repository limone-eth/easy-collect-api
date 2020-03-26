import {AbstractRoutes, MethodRoutes} from "../../routing-utilities/AbstractRoutes";
import {Route} from "../../routing-utilities/Route";
import {PathRoute} from "../../routing-utilities/PathRoute";
import {CheckV1} from "./check/Check.v1";

export class CheckRoutes extends AbstractRoutes {
    initializeRoutes(): Route[] {
        return [
            new Route(MethodRoutes.GET, '/', {'v1': new CheckV1()}),
        ];
    }

    initializePathRoutes(): PathRoute[] {
        return [];
    }

}

