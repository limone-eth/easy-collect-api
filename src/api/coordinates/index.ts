import {AbstractRoutes, MethodRoutes} from "../../routing-utilities/AbstractRoutes";
import {Route} from "../../routing-utilities/Route";
import {PathRoute} from "../../routing-utilities/PathRoute";
import {CoordinatesFromAddressV1} from "./coordinates-from-address/CoordinatesFromAddress.v1";

export class CoordinatesRoutes extends AbstractRoutes {
    initializeRoutes(): Route[] {
        return [
            new Route(MethodRoutes.GET, '/', {'v1': new CoordinatesFromAddressV1()}),
        ];
    }

    initializePathRoutes(): PathRoute[] {
        return [];
    }

}

