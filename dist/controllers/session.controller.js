"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionValidatorController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const messages_1 = require("../config/messages");
const auth_service_1 = require("../services/auth.service");
const models_1 = require("../db/models");
const logger_util_1 = __importDefault(require("../util/logger.util"));
class SessionValidatorController {
    static create(req, res, next) {
        if (!req.body.email || !req.body.password)
            return next({ error: new Error(messages_1.requestMessage["params.missing"]), custom: true });
        res.locals.email = req.body.email;
        res.locals.password = req.body.password;
        next();
    }
    static update(req, res, next) {
        next();
    }
    static destroy(req, res, next) {
        next();
    }
    static show(req, res, next) {
        next();
    }
}
exports.SessionValidatorController = SessionValidatorController;
class SessionController {
    static create(req, res, next) {
        const { email, password } = res.locals;
        auth_service_1.auth(email, password)
            .then((user) => {
            models_1.HistoryAccess.create({
                id_user: user.id,
                ip: req.clientIp
            })
                .catch((e) => {
                logger_util_1.default().error(e, 'APP');
            });
            const token = jsonwebtoken_1.default.sign(user, process.env.JWT_KEY || '', { expiresIn: '2h' });
            res.json({ status: 'success', user, token });
        })
            .catch((e) => {
            next(e);
        });
    }
    static destroy(req, res) {
        if (req.cookies['auth-token'])
            res.clearCookie('auth-token');
        res.json({ status: 'success' });
    }
}
exports.default = SessionController;
