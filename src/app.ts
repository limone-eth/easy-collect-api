import express from 'express';
import * as bodyParser from 'body-parser';
import {Shop} from "./db/models/Shop.model";
import {connect} from "./db/db";
import {ShopHasCategories} from "./db/models/Shop_Has_Categories";
import {Column, Like} from "typeorm";
import { Category } from './db/models/Category.model';

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

app.get('/', (req, res) => res.send('Hello World!'));

// CREATE
app.post('/shops', async (req, res) => {
    const shop = new Shop();
    shop.name = req.body.name;
    shop.address = req.body.address;
    const options: Options = {
        provider: 'opencage',
        apiKey: 'cbaac7da04934c418f6e082b76467102'
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
    for (const cat_id of req.body.categories_ids){
        const category = await Category.findOne({
            where: {
                id: cat_id
            }
        });
        shop.categories.push(category);
    }
    await shop.save();
    if (shop.categories && shop.categories.length <= 3) {
        for (const category of shop.categories) {
            const shopHasCategories = new ShopHasCategories();
            const shopLookup = await Shop.findOne({
                where: {
                    name: req.body.name
                }
            });
            shopHasCategories.categories_id = category.id;
            shopHasCategories.shops_id = shopLookup.id;
            shopHasCategories.natural_key = shopHasCategories.categories_id + "_" + shopHasCategories.shops_id;
            await shopHasCategories.save();
        }
    }
    res.send(shop);
});

// READ
app.get('/shops', async (req, res) => {
    const filter = req.query.filter;
    const categories_id = req.query.categories_id;
    const whereArray:any[] = [];
    if (categories_id){
        whereArray.push({
            categories_id,

        });
        whereArray.push({
            categories_id
        });
    }
    let shops;
    if (filter) {
        whereArray[0].name = Like("%" + filter + "%");
        whereArray[0].description =  Like("%" + filter + "%");
        shops = await Shop.find({
            where: whereArray
        });
    } else if (categories_id) {
        shops = await Shop.find({
            where: {
                categories_id
            }
        });
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
app.put('/shops/:id', async (req, res) => {
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
        if (req.body.description){
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
});

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
