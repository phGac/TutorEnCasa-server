"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const request_ip_1 = require("request-ip");
const app_middleware_1 = require("./middlewares/app.middleware");
const logger_util_1 = __importStar(require("./util/logger.util"));
class App {
    constructor() {
        this.app = express_1.default();
        this.port = 3000;
        this.server = null;
        this.configure();
    }
    configure() {
        this.app.use(cors_1.default());
        if (process.env.NODE_ENV != 'test')
            this.app.use(morgan_1.default('dev'));
        this.app.set('trust proxy', 1);
        this.app.set('views', path_1.default.resolve(__dirname, '..', 'resources', 'views'));
        this.app.set('view engine', 'ejs');
        this.app.use(request_ip_1.mw());
        if (process.env.NODE_ENV == 'development')
            this.app.use(logger_util_1.default(logger_util_1.TypeLogger.CONSOLE).configure({ level: 'ERROR' }));
        else
            this.app.use(logger_util_1.default(logger_util_1.TypeLogger.CONSOLE).configure({ level: 'ERROR' }));
        this.app.use(body_parser_1.default.json({ limit: '50mb' }));
        this.app.use(body_parser_1.default.urlencoded({ extended: false, limit: '50mb', parameterLimit: 1000000 }));
        this.app.use(cookie_parser_1.default());
        this.app.use('/public', express_1.default.static(path_1.default.join(__dirname, '..', 'resources', 'public')));
        this.app.use(express_fileupload_1.default({
            limits: { fileSize: 50 * 1024 * 1024 },
            debug: (process.env.NODE_ENV == 'delopment') ? true : false
        }));
    }
    init(port = null, callback) {
        this.app.use(app_middleware_1.errorHandler);
        this.app.use(app_middleware_1.notFoundHandler);
        if (port)
            this.port = port;
        this.server = this.app.listen(this.port, (err) => {
            callback(this.port, err);
            if (err) {
                process.exit(1);
            }
        });
    }
    getApp() {
        return this.app;
    }
    index(handler) {
        this.app.get('/', handler);
    }
    addRoutes(prefix, routes) {
        if (prefix != null)
            this.app.use(prefix, routes);
        else
            this.app.use(routes);
    }
    close(callback) {
        var _a;
        (_a = this.server) === null || _a === void 0 ? void 0 : _a.close(callback);
    }
}
exports.default = new App();
