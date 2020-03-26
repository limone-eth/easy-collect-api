'use strict';

import {RequestController} from "../../../routing-utilities/RequestController";
import {Request, Response, NextFunction} from "express";
import * as Joi from "joi";
import {Category} from "../../../db/models/Category.model";

export class CheckV1 extends RequestController {
    validate?: Joi.JoiObject;

    async check(): Promise<any> {
        return {
            message: "ok"
        }
    }

    async exec(req: Request, res: Response, next: NextFunction): Promise<any> {
        return await this.check();
    }

}



