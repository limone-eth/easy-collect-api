'use strict';

import {RequestController} from "../../../routing-utilities/RequestController";
import {Request, Response, NextFunction} from "express";
import * as Joi from "joi";
import {Shop} from "../../../db/models/Shop.model";

import {createQueryBuilder, Like} from "typeorm";

export class RetrieveV1 extends RequestController {
    validate?: Joi.JoiObject = Joi.object().keys({
        query: {
            filter: Joi.string(),
            categories_id: Joi.number()
        }
    });

    async retrieveShops(req: Request): Promise<Shop[]> {
        const filter = "%" + req.query.filter + "%";
        const categories_id = req.query.categories_id;
        let shops;
        if (req.query.filter && categories_id) {
            shops = await createQueryBuilder(Shop, "shops")
                .innerJoin("shop_has_categories", "shc",
                    "shc.shops_id = shops.id and shc.categories_id = :categories_id", {categories_id})
                .innerJoin("shop_has_categories", "shc_2",
                    "shc_2.shops_id = shc.shops_id")
                .innerJoinAndSelect("shops.categories", "categories", "categories.id = shc_2.categories_id")
                .where("shops.is_deleted = false and (shops.name like :filter or shops.address like :filter)", {filter})
                .getMany();
        } else if (req.query.filter) {
            shops = await Shop.find({
                where: [
                    {name: Like("%" + filter + "%")},
                    {description: Like("%" + filter + "%")}
                ]
            });
        } else if (categories_id) {
            shops = await createQueryBuilder(Shop, "shops")
                .innerJoin("shop_has_categories", "shc",
                    "shc.shops_id = shops.id and shc.categories_id = :categories_id", {categories_id})
                .innerJoin("shop_has_categories", "shc_2",
                    "shc_2.shops_id = shc.shops_id")
                .innerJoinAndSelect("shops.categories", "categories", "categories.id = shc_2.categories_id")
                .where("shops.is_deleted = false")
                .getMany();
        } else {
            shops = await Shop.find();
        }
        return shops;
    }

    async exec(req: Request, res: Response, next: NextFunction): Promise<Shop[]> {
        return await this.retrieveShops(req);
    }

}



