"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const logger_util_1 = __importDefault(require("../util/logger.util"));
const messages_1 = require("../config/messages");
function errorHandler(error, req, res, next) {
    if (error) {
        let message = null;
        if (!error.custom) {
            error = error.error || error;
            logger_util_1.default().error(error);
            message = messages_1.requestMessage["error.unknow"];
        }
        else {
            error = error.error || error;
            if (error instanceof Error)
                message = error.message;
            else
                message = error;
        }
        res.status(400).json({ status: 'failed', error: message });
    }
    else {
        next();
    }
}
exports.errorHandler = errorHandler;
function notFoundHandler(req, res) {
    const ip = req.clientIp;
    const path = req.originalUrl;
    logger_util_1.default().warning(`Ruta no encontrada [${ip}]: ${path}`, 'HTTP:404:NotFound');
    res.status(404).json({ status: 'failed', error: "ruta no encontrada" });
}
exports.notFoundHandler = notFoundHandler;
