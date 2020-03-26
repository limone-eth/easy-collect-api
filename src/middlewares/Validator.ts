'use strict';

import {Request, Response, NextFunction} from 'express';


import * as validation from 'express-validation'

import * as Joi from 'joi'
import {ValidationResult} from "joi";
import {ValidationErrorItem} from "joi";
import {ValidationError} from "express-validation";

export class Validator {

    static async validates(schema: any, req: any, res: Response, next: NextFunction) {
        const result: ValidationResult<any> = Joi.validate(req, schema);
        if (result.error) {
            const errors = result.error.details.map((item: ValidationErrorItem) => {
                const message: validation.Messages = {
                    message: item.message.replace(/"/g,'\''),
                    types: item.type
                };
                return message;
            });
            const validationError: ValidationError = {
                errors,
                status: 422,
                statusText: 'Unprocessable entity',
                message: "validation error"
            };
            // validationError.message = 'Parameters did not pass validation';
            const dumpData: any = {
                url: req.url,
                body: req.body,
                query: req.query,
                params: req.params,
                ip: req.ip
            };
            if (req.user) {
                dumpData.users_id = req.user.id;
            }
            return res.status(validationError.status).json({
                message: 'parameters did not pass validation, check errors',
                errors: validationError.errors
            });
        } else {
            next();
        }
    }

}

