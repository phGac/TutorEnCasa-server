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
const to_show_client_util_1 = require("../util/to_show_client.util");
const tutor_model_1 = require("../db/models/tutor.model");
const user_model_1 = require("../db/models/user.model");
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
            let userClient = to_show_client_util_1.userToShowClient(user);
            let userTokenClient = to_show_client_util_1.userToShowClient(user);
            // @ts-ignore
            if (user.role_tutor && user.role_tutor.status != tutor_model_1.TutorStatus.ACTIVE) {
                userClient.roles = userClient.roles.filter((role) => (role != user_model_1.UserRole.TUTOR));
            }
            const token = jsonwebtoken_1.default.sign(userTokenClient, process.env.JWT_KEY || '', { expiresIn: '6h' });
            res.json({ status: 'success', user: userClient, token });
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
