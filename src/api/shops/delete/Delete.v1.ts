'use strict';

import {RequestController} from "../../../routing-utilities/RequestController";
import {Request, Response, NextFunction} from "express";
import * as Joi from "joi";
import {XError} from "../../../routing-utilities/XError";
import {Shop} from "../../../db/models/Shop.model";

export class DeleteV1 extends RequestController {
    validate?: Joi.JoiObject = Joi.object().keys({
        params: {
            genres_id: Joi.number().required()
        }
    });

    async deleteShop(req: Request): Promise<{ message: string }> {
        const shop = await Shop.findOne({
            where: {
                id: req.params.id
            }
        });
        if (shop) {
            shop.is_deleted = true;
            await shop.save();
            return {message: 'Shop deleted'};
        } else {
            throw new XError(XError.RESOURCE_NOT_FOUND_ERROR, 404, 'Shop not found.')
        }
    }

    async exec(req: Request, res: Response, next: NextFunction): Promise<{ message: string }> {
        return await this.deleteShop(req);
    }

}



