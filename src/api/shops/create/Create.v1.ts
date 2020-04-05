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
            city: Joi.string().required(),
            cap: Joi.string().required(),
            description: Joi.string().required(),
            categories_ids: Joi.array().items(number()).required().max(3),
            website: Joi.string(),
            telegram: Joi.string(),
            facebook: Joi.string(),
            phone: Joi.string(),
            accepts_terms_and_conditions: Joi.boolean(),
        }).or('facebook', 'telegram','phone')
    });

    async createShop(req: Request): Promise<Shop> {
        let shop = new Shop();
        shop.name = req.body.name;
        shop.address = req.body.address;
        shop.city = req.body.city;
        shop.cap = req.body.cap;
        shop.accepts_terms_and_conditions = req.body.accepts_terms_and_conditions;
        if (req.body.lat && req.body.lng){
            shop.lat = req.body.lat;
            shop.lng = req.body.lng;
        } else {
            shop = await shop.setCoordinatesFromAddress();
        }
        shop.natural_key = shop.name.toLowerCase() + "_" + shop.lat + "_" + shop.lng;
        shop.description = req.body.description;
        shop.phone = req.body.phone;
        if (req.body.website){
            if (req.body.website.includes("http://") || req.body.website.includes("https://")){
                shop.website = req.body.website;
            } else {
                shop.website = "http://" + req.body.website;
            }
        }
        if (req.body.telegram){
            if (req.body.telegram.includes("https://")){
                shop.telegram = req.body.telegram;
            } else {
                shop.telegram = "https://" + req.body.telegram;
            }
        }
        if (req.body.facebook){
            if (req.body.facebook.includes("https://")){
                shop.facebook = req.body.facebook;
            } else {
                shop.facebook = "https://" + req.body.facebook;
            }
        }
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



