import express, { Application, Router, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { mw as requestIp } from 'request-ip';
import { errorHandler, notFoundHandler } from './middlewares/app_middleware';
import logger, { TypeLogger } from './util/logger';

class App {
    private app: Application;
    private port: number;

    constructor() {
        this.app = express();
        this.port = 3000;
        this.configure();
    }

    private configure() {
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.set('trust proxy', 1);
        this.app.use(requestIp());
        this.app.use(logger(TypeLogger.DATA_BASE).configure({ level: 'ERROR' }));
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ extended: false, limit: '50mb', parameterLimit: 1000000 }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, '..', 'resources', 'public')));
        this.app.use(fileUpload({
            limits: { fileSize: 50 * 1024 * 1024 },
            useTempFiles: true,
            debug: true
        }));
    }

    init(port: number|null = null, callback: Function) {
        this.app.use(errorHandler);
        this.app.use(notFoundHandler);
        if(port) this.port = port;
        this.app.listen(this.port, (err) => {
            callback(this.port, err);
            if(err) {
                process.exit(1);
            }
        });
    }

    addRoutes(prefix: string|null, routes: Router) {
        if(prefix != null)
            this.app.use(prefix, routes);
        else
            this.app.use(routes);
    }
}

export default new App();