"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./db");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const morgan_1 = __importDefault(require("morgan"));
class App {
    constructor() {
        this.app = express_1.default();
        this.port = 3000;
        this.configure();
    }
    configure() {
        this.app.use(morgan_1.default('dev'));
        this.app.set('trust proxy', 1);
        this.app.use(express_session_1.default({
            secret: 'A1qrQdXifJqTs',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false }
        }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(cookie_parser_1.default());
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'public')));
    }
    init(port = null, callback) {
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
