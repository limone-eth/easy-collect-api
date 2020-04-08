'use strict';

import {RequestController} from "../../../routing-utilities/RequestController";
import {Request, Response, NextFunction} from "express";
import * as Joi from "joi";
import {Category} from "../../../db/models/Category.model";
import {XError} from "../../../routing-utilities/XError";
import {Shop} from "../../../db/models/Shop.model";
import * as request from "superagent";

export class CoordinatesFromAddressV1 extends RequestController {
    validate?: Joi.JoiObject = Joi.object().keys({
        query: Joi.object().keys({
            address: Joi.string().allow(null),
            city: Joi.string().allow(null),
            cap: Joi.number().allow(null)
        }).or('address','city','cap'),

    });

    async retrieveCoordinatesFromAddress(address?: string, city?: string, cap?: string): Promise<{lat: number, lng: number}> {
        const queryObj:any = {
            email: "colligo.shop@gmail.com",
            format: "json",
        };
        if (address) {
            queryObj.street = address
        }
        if (city) {
            queryObj.city = city;
        }
        if (cap) {
            queryObj.postalcode = cap;
        }
        // tslint:disable-next-line:no-shadowed-variable
        const response:any = await request.get("https://nominatim.openstreetmap.org/search")
            .query(queryObj);
        try {
            const lat = response.body[0].lat;
            const lng = response.body[0].lon;
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

    async exec(req: Request, res: Response, next: NextFunction): Promise<{lat: number, lng: number}> {
        return await this.retrieveCoordinatesFromAddress(req.query.address, req.query.city, req.query.cap);
    }

}



