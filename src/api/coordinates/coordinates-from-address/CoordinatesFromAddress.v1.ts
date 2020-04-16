'use strict';

import {RequestController} from "../../../routing-utilities/RequestController";
import {Request, Response, NextFunction} from "express";
import * as Joi from "joi";
import {XError} from "../../../routing-utilities/XError";
import {Shop} from "../../../db/models/Shop.model";
import * as request from "superagent";

export class CoordinatesFromAddressV1 extends RequestController {
    validate?: Joi.JoiObject = Joi.object().keys({
        query: {
            address: Joi.string().allow(null),
            city: Joi.string().allow(null),
            cap: Joi.number().allow(null)
        },

    });

    async retrieveCoordinatesFromAddress(address: any, city: any, cap: any): Promise<{ lat: number, lng: number }> {
        const queryObj: any = {
            email: "colligo.shop@gmail.com",
            format: "json",
        };
        if (address && !city && !cap) {
            throw new XError(Shop.MISSING_CAP_OR_CITY, 419, 'Missing city or CAP');
        } else {
            queryObj.street = address
            queryObj.city = city;
            queryObj.postalcode = cap;
        }
        // tslint:disable-next-line:no-shadowed-variable
        const response: any = await request.get("https://nominatim.openstreetmap.org/search")
            .query(queryObj);
        try {
            const lat: number = response.body[0].lat;
            const lng: number = response.body[0].lon;
            return {
                lat,
                lng
            }
        } catch (error) {
            if (error instanceof XError) {
                throw error;
            } else {
                throw new XError(Shop.COORDINATES_NOT_FOUND_ERROR, 419, 'Invalid address: coordinates not found')
            }
        }
    }

    async exec(req: Request, res: Response, next: NextFunction): Promise<{ lat: number, lng: number }> {
        return await this.retrieveCoordinatesFromAddress(req.query.address, req.query.city, req.query.cap);
    }

}



