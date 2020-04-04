import express from 'express';
import * as dotenv from "dotenv";
import * as bodyParser from 'body-parser';
import {connect} from "./db/db";

import {IndexRoute} from "./api";
import {ErrorHandler} from "./components/ErrorHandler";
import * as Sentry from '@sentry/node';

dotenv.config({path: 'local.env'});

connect().then(() => {
    console.log("[DB] Connected")
});

const app = express();

if (process.env.NODE_ENV === 'production'){
    Sentry.init({ dsn: 'https://0d6a6bffe82645c09ca26f142ecebd7c@sentry.io/5179184' });
// The request handler must be the first middleware on the app
    app.use(Sentry.Handlers.errorHandler({
        shouldHandleError(error) {
            // Capture only 500 errors
            if (error.status === 500) {
                return true
            }
            return false
        }
    }));
}


app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'j2');
app.set('x-powered-by', false); // disable x-powered-by header
app.set('trust proxy', 1); // use X-Forwarded-For header


// ***** Local env only ****
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS, DELETE');
    next()
});

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.version = req.header('accept-version');
    req.requestTime = new Date();
    next();
});

app.use('', new IndexRoute().initRouter());
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    next();
});

app.all('*', (req: express.Request, res: express.Response) => {
    throw new Error("Bad request")
});
app.use((e: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (e.message === "Bad request") {
        res.status(400).json({message: e.message});
    }
});
app.use(new ErrorHandler().errorHandler);

export {app};
