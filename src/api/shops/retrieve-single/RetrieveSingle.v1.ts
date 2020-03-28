'use strict';

import {RequestController} from "../../../routing-utilities/RequestController";
import {Request, Response, NextFunction} from "express";
import * as Joi from "joi";
import {XError} from "../../../routing-utilities/XError";
import {Shop} from "../../../db/models/Shop.model";

export class RetrieveSingleV1 extends RequestController {
    validate?: Joi.JoiObject = Joi.object().keys({
        params: {
            id: Joi.number().required()
        }
    });

    async retrieveShop(req: Request): Promise<Shop> {
        const shop = await Shop.findOne({
            where: {
                id: req.params.id,
                is_deleted: false
            }
        });
        if (shop) {
            return shop;
        } else {
            throw new XError(XError.RESOURCE_NOT_FOUND_ERROR, 404, 'Shop not found.')
        }
    }

    async exec(req: Request, res: Response, next: NextFunction): Promise<Shop> {
        return await this.retrieveShop(req);
    }

}



