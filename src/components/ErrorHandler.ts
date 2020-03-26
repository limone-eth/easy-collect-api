import * as express from "express";
export class ErrorHandler {

    errorHandler(err: any, req: express.Request, res: express.Response, next: express.NextFunction): any  {
        if (err && err instanceof SyntaxError) return res.sendStatus(500);
        return res.sendStatus(500);
    }
}
