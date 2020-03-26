import {AbstractRoutes, MethodRoutes} from "../../routing-utilities/AbstractRoutes";
import {Route} from "../../routing-utilities/Route";
import {PathRoute} from "../../routing-utilities/PathRoute";
import {RetrieveV1} from "./retrieve/Retrieve.v1";

export class CategoriesRoutes extends AbstractRoutes {
    initializeRoutes(): Route[] {
        return [
            new Route(MethodRoutes.GET, '/', {'v1': new RetrieveV1()}),
        ];
    }

    initializePathRoutes(): PathRoute[] {
        return [];
    }

}

