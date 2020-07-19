"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/env");
require("./db");
const app_1 = __importDefault(require("./app"));
const logger_util_1 = __importDefault(require("./util/logger.util"));
const routes_1 = __importDefault(require("./routes"));
routes_1.default(app_1.default);
app_1.default.init(parseInt(process.env.PORT || '3000'), (port, err) => {
    if (err) {
        logger_util_1.default().error(`Error on Start App: ${err.message}`, 'APP');
    }
    else {
        logger_util_1.default().info(`Server listening on port: ${port}`, 'APP');
    }
});
