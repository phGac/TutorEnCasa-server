"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/env");
require("./db");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app_middleware_1 = require("./middlewares/app_middleware");
class App {
    constructor() {
        this.app = express_1.default();
        this.port = 3000;
        this.configure();
    }
    configure() {
        this.app.use(cors_1.default());
        this.app.use(morgan_1.default('dev'));
        this.app.set('trust proxy', 1);
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(body_parser_1.default.json());
        this.app.use(cookie_parser_1.default());
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'resources', 'public')));
    }
    getApp() {
        return this.app;
    }
    init(port = null, callback) {
        this.app.use(app_middleware_1.errorHandler);
        this.app.use(app_middleware_1.notFoundHandler);
        if (port)
            this.port = port;
        this.app.listen(this.port, (err) => {
            callback(this.port, err);
            if (err) {
                process.exit(1);
            }
        });
    }
    addRoutes(prefix, routes) {
        if (prefix != null)
            this.app.use(prefix, routes);
        else
            this.app.use(routes);
    }
}
exports.default = new App();
