import express from 'express';
import * as bodyParser from 'body-parser';
import {Shop} from "./db/models/Shop.model";
import {connect} from "./db/db";
import {ShopHasCategories} from "./db/models/Shop_Has_Categories";
import {Column} from "typeorm";
import { Category } from './db/models/Category.model';

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
    shop.lat = req.body.lat;
    shop.lng = req.body.lng;
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
                    name: req.params.name
                }
            });
            shopHasCategories.categories_id = category.id.toString();// not sure about string or Int, let's discuss later
            shopHasCategories.shops_id = shopLookup.id.toString();   // not sure about string or Int, let's discuss later
            shopHasCategories.natural_key = shopHasCategories.categories_id + "_" + shopHasCategories.shops_id;
            await shopHasCategories.save();
        }
    }
    res.send(shop);
});

// READ
app.get('/shops', async (req, res) => {
    const shops = await Shop.find();
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

export {app};
