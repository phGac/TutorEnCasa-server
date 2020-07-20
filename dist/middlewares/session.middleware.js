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
exports.isNotTutor = exports.isTutor = exports.isAdministrator = exports.isNotLoggedIn = exports.isLoggedIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const messages_1 = require("../config/messages");
const user_model_1 = __importStar(require("../db/models/user.model"));
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
    // @ts-ignore
    const { id } = req.user;
    const options = {
        where: { id },
        include: [{
                association: 'role_tutor',
                required: true
            }]
    };
    user_model_1.default.findOne(options)
        .then((user) => {
        // @ts-ignore
        if (user && (user.role_tutor.status == tutor_model_1.TutorStatus.ACTIVE || user.role_tutor.status == tutor_model_1.TutorStatus.UNVALIDATED))
            next({ error: 'Ya has solicitado ser tutor', custom: true }); // requestMessage["user.role.notAllowed"]
        else
            next();
    })
        .catch((e) => {
        next({ error: e, custom: false });
    });
}
exports.isNotTutor = isNotTutor;
