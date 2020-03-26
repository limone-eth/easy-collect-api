import express from 'express';
import * as bodyParser from 'body-parser';
import {Shop} from "./db/models/Shop.model";
import {connect} from "./db/db";
import {ShopHasCategories} from "./db/models/Shop_Has_Categories";
import {Column, createQueryBuilder, Like} from "typeorm";
import {Category} from './db/models/Category.model';

import node_geocoder = require("node-geocoder");
import {Options} from "node-geocoder";

connect();


const app = express();

app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

// ***** Local env only ****
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-team");
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS, DELETE');
    next()
});

app.get('/', (req, res) => res.send('Hello World!'));

// CREATE
app.post('/shops', async (req, res) => {
    const shop = new Shop();
    shop.name = req.body.name;
    shop.address = req.body.address;
    const options: Options = {
        provider: 'opencage',
        apiKey: process.env.OPEN_CAGE_API_KEY
    };
    const geocoder = node_geocoder(options);

    const response = await geocoder.geocode(req.body.address);
    shop.lat = response[0].latitude;
    shop.lng = response[0].longitude;

    shop.natural_key = shop.name.toLowerCase() + "_" + shop.lat + "_" + shop.lng;
    shop.description = req.body.description;
    shop.phone = req.body.phone;
    shop.telegram = req.body.telegram;
    shop.facebook = req.body.facebook;
    shop.categories = [];
    try {
        await shop.save();
    } catch (err) {
        res.send(err);
    }

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
    await addCategoriesToShop(shopLookup.id, req.body.categories_ids);
    const s = await Shop.find({
        where: {
            name: req.body.name
        }
    });
    res.send(shop);
});

async function addCategoriesToShop(shops_id: number, categories_ids: number[]) {
    for (const item of categories_ids) {
        const shopHasCategories = new ShopHasCategories();
        shopHasCategories.categories_id = item;
        shopHasCategories.shops_id = shops_id;
        shopHasCategories.natural_key = shopHasCategories.categories_id + "_" + shopHasCategories.shops_id;
        await shopHasCategories.save();
    }
}

// READ
app.get('/shops', async (req, res) => {
    const filter = "%" + req.query.filter + "%";
    const categories_id = req.query.categories_id;
    const whereArray: any[] = [];
    if (categories_id) {
        whereArray.push({
            categories_id,
        });
        whereArray.push({
            categories_id
        });
    }
    let shops;
    if (filter && categories_id) {
        shops = await createQueryBuilder(Shop, "shops")
            .innerJoin("shop_has_categories", "shc",
                "shc.shops_id = shops.id and shc.categories_id = :categories_id", {categories_id})
            .innerJoin("shop_has_categories", "shc_2",
                "shc_2.shops_id = shc.shops_id")
            .innerJoinAndSelect("shops.categories", "categories", "categories.id = shc_2.categories_id")
            .where("shops.is_deleted = false and (shops.name like :filter or shops.description like :filter)", {filter})
            .getMany();
    } else if (filter) {
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
    res.send(shops);
});

// READ SINGLE
app.get('/shops/:id', async (req, res) => {
    const shop = await Shop.findOne({
        where: {
            id: req.params.id
        }
    });
    if (shop) {
        res.send(shop);
    } else {
        res.status(404).send({message: "Shop not found"})
    }
});

// UPDATE
/*app.put('/shops/:id', async (req, res) => {
    const shop = await Shop.findOne({
        where: {
            id: req.params.id
        }
    });
    if (shop) {
        if (req.body.name) {
            shop.name = req.body.name;
        }
        if (req.body.address) {
            shop.address = req.body.address;
        }
        if (req.body.description) {
            shop.description = req.body.description;
        }
        if (req.body.lat) {
            shop.lat = req.body.lat;
        }
        if (req.body.lng) {
            shop.lng = req.body.lng;
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
        res.send(shop);
    } else {
        res.status(404).send({message: "Shop not found"})
    }
});

// DELETE
app.delete('/shops/:id', async (req, res) => {
    const shop = await Shop.findOne({
        where: {
            id: req.params.id
        }
    });
    if (shop) {
        await shop.remove();
        res.send({message: 'Shop deleted'});
    } else {
        res.status(404).send({message: "Shop not found"})
    }
}); */

app.get('/categories', async (req, res) => {
    const categories = await Category.find({
        where: {
            is_deleted: false
        },
        order: {
            name: "ASC",
        }
    });
    res.send(categories);
});

export {app};
