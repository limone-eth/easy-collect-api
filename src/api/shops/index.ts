import {AbstractRoutes, MethodRoutes} from "../../routing-utilities/AbstractRoutes";
import {Route} from "../../routing-utilities/Route";
import {PathRoute} from "../../routing-utilities/PathRoute";
import {RetrieveV1} from "./retrieve/Retrieve.v1";
import {CreateV1} from "./create/Create.v1";

export class ShopsRoutes extends AbstractRoutes {
    initializeRoutes(): Route[] {
        return [
            new Route(MethodRoutes.GET, '/', {'v1': new RetrieveV1()}),
            new Route(MethodRoutes.POST, '/', {'v1': new CreateV1()}),
        ];
    }

    initializePathRoutes(): PathRoute[] {
        return [];
    }

}

