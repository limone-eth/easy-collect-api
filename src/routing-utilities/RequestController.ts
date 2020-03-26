import {Request, Response, NextFunction} from 'express'
import {JoiObject} from "joi";


export abstract class RequestController {
    abstract async exec(req: Request, res: Response, next: NextFunction): Promise<any>;

    abstract validate?: JoiObject;
}
