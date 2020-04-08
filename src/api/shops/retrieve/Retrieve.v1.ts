'use strict';

import {RequestController} from "../../../routing-utilities/RequestController";
import {Request, Response, NextFunction} from "express";
import * as Joi from "joi";
import {Shop} from "../../../db/models/Shop.model";

import {createQueryBuilder, Like} from "typeorm";
import {Options} from "node-geocoder";
import node_geocoder = require("node-geocoder");

export class RetrieveV1 extends RequestController {
    validate?: Joi.JoiObject = Joi.object().keys({
        query: {
            filter: Joi.string(),
            categories_id: Joi.number(),
            address: Joi.string()
        }
    });

    async retrieveShops(req: Request): Promise<{lat: number, lng: number, shops: Shop[]}> {
        const filter = "%" + req.query.filter + "%";
        const categories_id = req.query.categories_id;
        const address = req.query.address;
        const lat: number = null;
        const lng: number = null;
        /*if (req.query.address){
            const coordinates = await this.retrieveCoordinatesFromAddress(address);
            lat = coordinates.lat;
            lng = coordinates.lng;
        }*/
        let shops;
        if (req.query.filter && categories_id) {
            shops = await createQueryBuilder(Shop, "shops")
                .innerJoin("shop_has_categories", "shc",
                    "shc.shops_id = shops.id and shc.categories_id = :categories_id", {categories_id})
                .innerJoin("shop_has_categories", "shc_2",
                    "shc_2.shops_id = shc.shops_id")
                .innerJoinAndSelect("shops.categories", "categories", "categories.id = shc_2.categories_id")
                .where("shops.is_deleted = false and (shops.name like :filter)", {filter})
                .getMany();
        } else if (req.query.filter) {
            shops = await Shop.find({
                where: [
                    {name: Like("%" + filter + "%"), is_deleted: false}
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
        return {
            lat,
            lng,
            shops
        };
    }

    async retrieveCoordinatesFromAddress(address: string){
        const options: Options = {
            provider: 'opencage',
            apiKey: process.env.OPEN_CAGE_API_KEY
        };
        const geocoder = node_geocoder(options);

        const response = await geocoder.geocode(address);
        try {
            const lat = response[0].latitude;
            const lng = response[0].longitude;
            return {
                "lat": lat,
                "lng": lng
            }
        } catch (e) {
            return {
                "lat": -1,
                "lng": -1
            }
        }
    }

    async exec(req: Request, res: Response, next: NextFunction): Promise<{lat: number, lng:number, shops: Shop[]}> {
        return await this.retrieveShops(req);
    }

}



