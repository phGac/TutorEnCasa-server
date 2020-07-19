"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotTutor = exports.isTutor = exports.isAdministrator = exports.isNotLoggedIn = exports.isLoggedIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const messages_1 = require("../config/messages");
const user_model_1 = require("../db/models/user.model");
const models_1 = require("../db/models");
const tutor_model_1 = require("../db/models/tutor.model");
function isLoggedIn(req, res, next) {
    const token = req.headers['access-token'] || req.cookies['auth-token'];
    if (token && typeof token == 'string') {
        jsonwebtoken_1.default.verify(token, process.env.JWT_KEY || '', (err, decoded) => {
            if (err)
                return next({ error: messages_1.loginMessage["user.token.notfound"], custom: true });
            req.user = decoded;
            next();
        });
    }
    else {
        next({ error: messages_1.loginMessage["user.token.notfound"], custom: true });
    }
}
exports.isLoggedIn = isLoggedIn;
function isNotLoggedIn(req, res, next) {
    const token = req.headers['access-token'];
    if (token)
        next({ error: messages_1.requestMessage["session.already"], custom: true });
    else
        next();
}
exports.isNotLoggedIn = isNotLoggedIn;
function isAdministrator(req, res, next) {
    var _a;
    // @ts-ignore
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.roles.includes(user_model_1.UserRole.ADMINISTRATOR)))
        return next({ error: messages_1.requestMessage["user.role.notAllowed"], custom: true });
    next();
}
exports.isAdministrator = isAdministrator;
function isTutor(req, res, next) {
    var _a;
    // @ts-ignore
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.roles.includes(user_model_1.UserRole.TUTOR)))
        return next({ error: messages_1.requestMessage["user.role.notAllowed"], custom: true });
    next();
}
exports.isTutor = isTutor;
function isNotTutor(req, res, next) {
    var _a;
    // @ts-ignore
    if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.roles.includes(user_model_1.UserRole.TUTOR)) {
        // @ts-ignore
        models_1.Tutor.findOne({ where: { id: req.user.id_tutor } })
            .then((tutor) => {
            if ((tutor === null || tutor === void 0 ? void 0 : tutor.status) == tutor_model_1.TutorStatus.UNVALIDATED)
                next({ error: messages_1.requestMessage["user.role.notAllowed"], custom: true });
            else
                next();
        });
    }
    else {
        next();
    }
}
exports.isNotTutor = isNotTutor;
