'use strict';

import {RequestController} from "../../../routing-utilities/RequestController";
import {Request, Response, NextFunction} from "express";
import * as Joi from "joi";
import {XError} from "../../../routing-utilities/XError";
import {Shop} from "../../../db/models/Shop.model";
import {number} from "joi";

export class UpdateV1 extends RequestController {
    validate?: Joi.JoiObject = Joi.object().keys({
        params: {
            shops_id: Joi.number().required()
        },
        body: {
            name: Joi.string(),
            address: Joi.string(),
            description: Joi.string(),
            categories_ids: Joi.array().items(number()),
            telegram: Joi.string(),
            facebook: Joi.string(),
            phone: Joi.string(),
        }
    });

    async updateShop(req: Request): Promise<Shop> {
        let shop = await Shop.findOne({
            where: {
                id: req.params.id
            }
        });
        if (shop) {
            if (req.body.name) {
                shop.name = req.body.name;
            }
            if (req.body.description) {
                shop.name = req.body.name;
            }
            if (req.body.address) {
                shop.address = req.body.address;
                shop = await shop.setCoordinatesFromAddress();
            }
            if (req.body.description) {
                shop.description = req.body.description;
            }
            if (req.body.phone) {
                shop.phone = req.body.phone;
            }
            if (req.body.telegram) {
                shop.telegram = req.body.telegram;
            }
            if (req.body.facebook) {
                shop.facebook = req.body.facebook;
            }
            await shop.save();
            return shop;
        } else {
            throw new XError(XError.RESOURCE_NOT_FOUND_ERROR,404,'Shop not found.')
        }
    }

    async exec(req: Request, res: Response, next: NextFunction): Promise<Shop> {
        return await this.updateShop(req);
    }

}



