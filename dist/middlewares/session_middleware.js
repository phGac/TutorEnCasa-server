"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSession = exports.isTutor = exports.isAdministrator = exports.isNotLoggedIn = exports.isLoggedIn = void 0;
const messages_1 = require("../config/messages");
const user_1 = require("../db/models/user");
function isLoggedIn(req, res, next) {
    if (!req.session || !req.session.user) {
        res.status(400)
            .json({ error: messages_1.requestMessage["session.unloged"] });
        return;
    }
    next();
}
exports.isLoggedIn = isLoggedIn;
function isNotLoggedIn(req, res, next) {
    if (req.session) {
        req.session.reload(() => { });
        if (req.session.user) {
            res.status(400)
                .json({ error: messages_1.requestMessage["session.already"] });
            return;
        }
    }
    next();
}
exports.isNotLoggedIn = isNotLoggedIn;
function isAdministrator(req, res, next) {
    if (!req.session || !req.session.user.roles.includes(user_1.UserRole.ADMINISTRATOR)) {
        res.status(400)
            .json({ error: messages_1.requestMessage["user.role.notAllowed"] });
        return;
    }
    next();
}
exports.isAdministrator = isAdministrator;
function isTutor(req, res, next) {
    if (!req.session || !req.session.user.roles.includes(user_1.UserRole.TUTOR)) {
        res.status(400)
            .json({ error: messages_1.requestMessage["user.role.notAllowed"] });
        return;
    }
    next();
}
exports.isTutor = isTutor;
function setSession(req, res) {
    if (req.session && res.locals.auth && res.locals.user) {
        const user = res.locals.user;
        const roles = [user_1.UserRole.STUDENT];
        if (user.role_administrator) {
            user.id_administrator = user.role_administrator.id;
            roles.push(user_1.UserRole.ADMINISTRATOR);
        }
        if (user.role_tutor) {
            user.id_tutor = user.role_tutor.id;
            roles.push(user_1.UserRole.TUTOR);
        }
        req.session.user = {
            id: user.id,
            id_tutor: user.id_tutor,
            id_administrator: user.id_administrator,
            email: user.email,
            dni: user.dni,
            roles: roles
        };
        req.session.save(() => { });
    }
}
exports.setSession = setSession;
