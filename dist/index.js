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
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importStar(require("./util/logger"));
const app_1 = __importDefault(require("./app"));
const index_routes_1 = __importDefault(require("./routes/index_routes"));
const user_routes_1 = __importDefault(require("./routes/user_routes"));
const session_routes_1 = __importDefault(require("./routes/session_routes"));
// configure Logger
logger_1.default(logger_1.TypeLogger.CONSOLE).init({
    formatDate: new Intl.DateTimeFormat('es', {
        timeZone: 'America/Santiago',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }),
});
app_1.default.addRoutes('/', index_routes_1.default);
app_1.default.addRoutes('/api', session_routes_1.default);
app_1.default.addRoutes('/api/user', user_routes_1.default);
app_1.default.init(3000, (port, err) => {
    if (err) {
        logger_1.default().error(`Error on Start App: ${err.message}`);
    }
    else {
        logger_1.default().info(`⚓  Server listening on port: ${port}  ⚓`);
    }
});
