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
exports.UserValidatorController = void 0;
const validator_1 = __importDefault(require("validator"));
// @ts-ignore
const verificador_rut_1 = __importDefault(require("verificador-rut"));
const user_service_1 = __importDefault(require("../services/user.service"));
const messages_1 = require("../config/messages");
const user_model_1 = __importStar(require("../db/models/user.model"));
const email_service_1 = __importStar(require("../services/email.service"));
const to_show_client_util_1 = require("../util/to_show_client.util");
const validator_util_1 = require("../util/validator.util");
const models_1 = require("../db/models");
const logger_util_1 = __importDefault(require("../util/logger.util"));
const hash_service_1 = require("../services/hash.service");
class UserValidatorController {
    static show(req, res, next) {
        next();
    }
    static create(req, res, next) {
        if (!req.params.step || !req.body.dni) {
            next({ error: new Error(messages_1.requestMessage["params.missing"]), custom: true });
            return;
        }
        switch (req.params.step) {
            case '1':
                if (!req.body.email || !req.body.password) {
                    next({ error: new Error(messages_1.requestMessage["params.missing"]), custom: true });
                    return;
                }
            case '2':
                if (!req.body.firstname || !req.body.lastname || !req.body.birthdate) {
                    next({ error: new Error(messages_1.requestMessage["params.missing"]), custom: true });
                    return;
                }
            default:
                next({ error: new Error(messages_1.registerMessage["step.out"]), custom: true });
                break;
        }
        if (validator_util_1.validateRut(req.body.dni)) {
            next({ error: new Error('El rut ingresado es inválido'), custom: true });
            return;
        }
        next();
    }
    static destroy(req, res, next) {
        next();
    }
    static validate(req, res, next) {
        res.locals.dni = req.params.dni;
        next();
    }
    static update(req, res, next) {
        next();
    }
    static profile(req, res, next) {
        if ((!req.body.password || !req.body.actual_password) && !req.body.email) {
            return next({ error: new Error(messages_1.requestMessage["params.missing"]), custom: true });
        }
        res.locals.email = req.body.email ? req.body.email : undefined;
        res.locals.password = req.body.password ? req.body.password : undefined;
        res.locals.actual_password = req.body.actual_password ? req.body.actual_password : undefined;
        next();
    }
}
exports.UserValidatorController = UserValidatorController;
class UserController {
    static show(req, res, next) {
        if (!req.params.id) {
            next({ error: new Error(messages_1.requestMessage["params.missing"]), custom: true });
            return;
        }
        const { id } = req.params;
        const options = {
            where: { id },
            include: [
                { association: 'role_tutor' },
                { association: 'role_administrator' },
            ]
        };
        user_model_1.default.findOne(options)
            .then((user) => {
            const toShow = (user) ? to_show_client_util_1.userToShowClient(user) : null;
            res.json({
                status: 'success',
                user: toShow
            });
        })
            .catch((err) => {
            next({ error: err, custom: false });
        });
    }
    static create(req, res, next) {
        let dniDv = null;
        switch (req.params.step) {
            case '1':
                const { email, password, dni } = req.body;
                dniDv = verificador_rut_1.default(dni);
                if (!validator_1.default.isEmail(email)) {
                    next({ error: new Error(messages_1.registerMessage["user.email.invalid"]), custom: true });
                    return;
                }
                if (!verificador_rut_1.default(dni, dniDv)) {
                    next({ error: new Error(messages_1.registerMessage["user.dni.invalid"]), custom: true });
                    return;
                }
                user_service_1.default.create({ email, password, dni })
                    .then((user) => {
                    res.render('templates/emails/validation-user', { url: `https://tutorencasa.tk/api/user/${dni}/validate` }, (err, html) => {
                        if (err) {
                            next({ error: err, custom: false });
                            return;
                        }
                        else {
                            email_service_1.default.sendEmail(new email_service_1.Email('Valida tu cuenta! - Tutor en Casa', html))
                                .then((messageId) => {
                                res.json({ status: 'success', message: messages_1.registerMessage["user.status.ok"] });
                            })
                                .catch((e) => {
                                next({ error: e, custom: false });
                            });
                        }
                    });
                })
                    .catch((err) => {
                    next(err);
                });
                break;
            case '2':
                dniDv = verificador_rut_1.default(req.body.dni);
                if (!verificador_rut_1.default(req.body.dni, dniDv)) {
                    next({ error: new Error(messages_1.registerMessage["user.dni.invalid"]), custom: true });
                    return;
                }
                const birthdate = validator_1.default.toDate(req.body.birthdate);
                if (!birthdate) {
                    next({ error: new Error(messages_1.registerMessage["user.birthday.invalid"]), custom: true });
                    return;
                }
                else if (!validator_util_1.hasMinNumberYears(birthdate, 10)) {
                    next({ error: new Error('Lo lamentamos, pero no tienes la edad mínima permitida para crear una cuenta :c'), custom: true });
                    return;
                }
                user_model_1.default.findOne({ where: { dni: req.body.dni } })
                    .then((user) => {
                    if (!user)
                        return next({ error: new Error('Usuario no encontrado'), custom: true });
                    else if (user.firstname)
                        return next({ error: new Error('El usuario ya ha finalizado su registro'), custom: true });
                    const data = {
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        birthdate: birthdate,
                        status: user_model_1.UserStatus.ACTIVE
                    };
                    user_service_1.default.update(data, { dni: req.body.dni })
                        .then((info) => {
                        if (info.count > 0) {
                            res.json({ status: 'success' });
                        }
                        else {
                            next({ error: new Error(messages_1.registerMessage["step.two.user.notFound"]), custom: true });
                        }
                    })
                        .catch((err) => {
                        next(err);
                    });
                })
                    .catch((e) => {
                    next({ error: e, custom: false });
                });
                break;
            default:
                next({ error: new Error(messages_1.registerMessage["step.out"]), custom: false });
                break;
        }
    }
    static update(req, res, next) {
    }
    static profile(req, res, next) {
        const { email, password, actual_password } = res.locals;
        // @ts-ignore
        const { id } = req.user;
        if (!email) {
            const options = {
                where: { id },
                include: [{
                        association: 'passwords',
                        order: [['createdAt', 'DESC']],
                        limit: 1
                    }]
            };
            user_model_1.default.findOne(options)
                .then((user) => {
                if (!user)
                    return next({ error: new Error('Usuario no encontrado'), custom: true });
                user.isValidPassword(actual_password)
                    .then((valid) => {
                    if (!valid)
                        return next({ error: new Error('La contraseña es inválida'), custom: true });
                    hash_service_1.encryptPassword(password, false)
                        .then(() => {
                        models_1.HistoryPassword.create({
                            id_user: id,
                            password
                        })
                            .catch((e) => logger_util_1.default().error(e));
                        res.json({ status: 'success' });
                    })
                        .catch((e) => {
                        next(e);
                    });
                })
                    .catch((e) => {
                    next(e);
                });
            })
                .catch((e) => {
                next({ error: e, custom: false });
            });
        }
        else {
            // @ts-ignore
            if (email == req.user.email) {
                return next({ error: new Error('El correo debe ser diferente al actual') });
            }
            user_model_1.default.findOne({ where: { email } })
                .then((user) => {
                if (user)
                    return next({ error: new Error('El correo ya está en uso'), custom: true });
                user_model_1.default.update({ email }, { where: { id } })
                    .catch((e) => {
                    logger_util_1.default().error(e);
                });
                res.json({ status: 'success' });
            })
                .catch((e) => {
                next({ error: e, custom: false });
            });
        }
    }
    static destroy(req, res) { }
    static validate(req, res, next) {
        const { dni } = res.locals;
        user_model_1.default.update({
            status: user_model_1.UserStatus.ACTIVE
        }, {
            where: {
                dni,
                status: user_model_1.UserStatus.UNVALIDATED
            }
        })
            .then((info) => {
            if (info[0] == 0) {
                next({ error: new Error('Usuario ya validado'), custom: true });
                return;
            }
            res.redirect(`/public/registro?paso=2&run=${dni}`);
        })
            .catch((e) => {
            next({ error: e, custom: false });
        });
    }
}
exports.default = UserController;
