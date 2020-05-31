import express, { Application, Router } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

class App {
    private app: Application;
    private port: number;

    constructor() {
        this.app = express();
        this.port = 3000;
        this.configure();
    }

    private configure() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, '..', 'public')));
    }

    init(port: number|null = null, callback: Function) {
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