"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const logger_1 = __importDefault(require("../util/logger"));
const messages_1 = require("../config/messages");
function errorHandler(error, req, res, next) {
    if (error) {
        if (!error.custom) {
            logger_1.default().error(error);
            res.status(400).json({ status: 'failed', error: messages_1.requestMessage["error.unknow"] });
        }
        else {
            res.status(400).json({ status: 'failed', error: error.error });
        }
    }
    else {
        next();
    }
}
exports.errorHandler = errorHandler;
function notFoundHandler(req, res, next) {
    logger_1.default().warning(`Ruta no encontrada: ${req.originalUrl}`);
    res.status(404).json({ status: 'failed', error: "ruta no encontrada" });
}
exports.notFoundHandler = notFoundHandler;
