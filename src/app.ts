import express, { Application, Router, Request, Response } from 'express';
import { Server } from 'http';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { mw as requestIp } from 'request-ip';
import { errorHandler, notFoundHandler } from './middlewares/app.middleware';
import logger, { TypeLogger } from './util/logger.util';

class App {
    private app: Application;
    private server: Server|null;
    private port: number;

    constructor() {
        this.app = express();
        this.port = 3000;
        this.server = null;
        this.configure();
    }

    private configure() {
        this.app.use(cors());
        if(process.env.NODE_ENV != 'test')
            this.app.use(morgan('dev'));
        this.app.set('trust proxy', 1);
        this.app.set('views', path.resolve(__dirname, '..', 'resources', 'views'));
        this.app.set('view engine', 'ejs');
        this.app.use(requestIp());
        if(process.env.NODE_ENV == 'development')
            this.app.use(logger(TypeLogger.CONSOLE).configure({ level: 'ERROR' }));
        else
            this.app.use(logger(TypeLogger.CONSOLE).configure({ level: 'ERROR' }));
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ extended: false, limit: '50mb', parameterLimit: 1000000 }));
        this.app.use(cookieParser());
        this.app.use('/public', express.static(path.join(__dirname, '..', 'resources', 'public')));
        this.app.use(fileUpload({
            limits: { fileSize: 50 * 1024 * 1024 },
            debug: (process.env.NODE_ENV == 'delopment') ? true : false
        }));
    }

    init(port: number|null = null, callback: (port: number, err: Error|undefined) => void) {
        this.app.use(errorHandler);
        this.app.use(notFoundHandler);
        if(port) this.port = port;
        this.server = this.app.listen(this.port, (err) => {
            callback(this.port, err);
            if(err) {
                process.exit(1);
            }
        });
    }

    getApp() {
        return this.app;
    }

    index(handler: (req: Request, res: Response) => void) {
        this.app.get('/', handler);
    }

    addRoutes(prefix: string|null, routes: Router) {
        if(prefix != null)
            this.app.use(prefix, routes);
        else
            this.app.use(routes);
    }

    close(callback : (err?: Error | undefined) => void) {
        this.server?.close(callback);
    }
}

export default new App();