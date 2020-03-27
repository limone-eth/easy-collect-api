'use strict';

import {RequestController} from "../../../routing-utilities/RequestController";
import {Request, Response, NextFunction} from "express";
import * as Joi from "joi";
import {Category} from "../../../db/models/Category.model";
import {Shop} from "../../../db/models/Shop.model";
import {ShopHasCategories} from "../../../db/models/Shop_Has_Categories";
import {number} from "joi";


export class CreateV1 extends RequestController {
    validate?: Joi.JoiObject = Joi.object().keys({
        body: Joi.object().keys({
            name: Joi.string().required(),
            address: Joi.string().required(),
            description: Joi.string().required(),
            categories_ids: Joi.array().items(number()).required().max(3),
            telegram: Joi.string(),
            facebook: Joi.string(),
            phone: Joi.string(),
        }).or('facebook', 'telegram','phone')
    });

    async createShop(req: Request): Promise<Shop> {
        let shop = new Shop();
        shop.name = req.body.name;
        shop.address = req.body.address;
        shop = await shop.setCoordinatesFromAddress();
        shop.natural_key = shop.name.toLowerCase() + "_" + shop.lat + "_" + shop.lng;
        shop.description = req.body.description;
        shop.phone = req.body.phone;
        shop.telegram = req.body.telegram;
        shop.facebook = req.body.facebook;
        shop.categories = [];
        await shop.save();
        for (const cat_id of req.body.categories_ids) {
            const category = await Category.findOne({
                where: {
                    id: cat_id
                }
            });
            shop.categories.push(category);
        }
        const shopLookup = await Shop.findOne({
            where: {
                name: req.body.name
            }
        });
        await this.addCategoriesToShop(shopLookup.id, req.body.categories_ids);
        return shop;
    }

    async addCategoriesToShop(shops_id: number, categories_ids: number[]) {
        for (const item of categories_ids) {
            const shopHasCategories = new ShopHasCategories();
            shopHasCategories.categories_id = item;
            shopHasCategories.shops_id = shops_id;
            shopHasCategories.natural_key = shopHasCategories.categories_id + "_" + shopHasCategories.shops_id;
            await shopHasCategories.save();
        }
    }

    async exec(req: Request, res: Response, next: NextFunction): Promise<Shop> {
        return await this.createShop(req);
    }

}



