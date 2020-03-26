'use strict';

import {RequestController} from "../../../routing-utilities/RequestController";
import {Request, Response, NextFunction} from "express";
import * as Joi from "joi";
import {Category} from "../../../db/models/Category.model";

export class RetrieveV1 extends RequestController {
    validate?: Joi.JoiObject;

    async retrieveCategories(req: Request): Promise<Category[]> {
        const categories = await Category.find({
            where: {
                is_deleted: false
            },
            order: {
                name: "ASC",
            }
        });
        return categories;
    }

    async exec(req: Request, res: Response, next: NextFunction): Promise<Category[]> {
        return await this.retrieveCategories(req);
    }

}



