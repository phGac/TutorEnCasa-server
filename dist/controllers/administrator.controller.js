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
exports.AdministratorValidatorController = void 0;
const models_1 = require("../db/models");
const tutor_model_1 = require("../db/models/tutor.model");
const messages_1 = require("../config/messages");
const file_service_1 = __importDefault(require("../services/file.service"));
const validator_1 = __importDefault(require("validator"));
const log_model_1 = __importDefault(require("../db/models/log.model"));
const email_service_1 = __importStar(require("../services/email.service"));
class AdministratorValidatorController {
    static create(req, res, next) {
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
    static tutorUnvalidated(req, res, next) {
        res.locals.id = (req.params.id) ? req.params.id : undefined;
        next();
    }
    static tutorCertificate(req, res, next) {
        if (!req.params.id) {
            return next({ error: new Error(messages_1.requestMessage["params.missing"]), custom: true });
        }
        res.locals.id = req.params.id;
        next();
    }
    static tutorValidate(req, res, next) {
        if (!req.params.id || !validator_1.default.isInt(req.params.id) || !req.body.status) {
            return next({ error: new Error(messages_1.requestMessage["params.missing"]), custom: true });
        }
        res.locals.id = req.params.id;
        res.locals.status = req.body.status;
        next();
    }
    static logs(req, res, next) {
        if (req.query.top && typeof req.query.top == 'string') {
            if (!validator_1.default.isInt(req.query.top))
                return next({ error: new Error(messages_1.requestMessage["params.missing"]), custom: true });
            else
                res.locals.top = parseInt(req.query.top);
        }
        else {
            res.locals.top = 50;
        }
        next();
    }
    static reports(req, res, next) {
        next();
    }
}
exports.AdministratorValidatorController = AdministratorValidatorController;
class AdministratorController {
    static tutorUnvalidated(req, res, next) {
        var _a;
        const { id } = res.locals;
        const options = {
            include: [
                {
                    association: 'user',
                    attributes: ['firstname', 'lastname', 'email', 'birthdate'],
                    required: true
                },
                { association: 'themes' },
            ]
        };
        if (!id) {
            options.where = { status: tutor_model_1.TutorStatus.UNVALIDATED };
        }
        else {
            options.where = {
                status: tutor_model_1.TutorStatus.UNVALIDATED,
                id
            };
            (_a = options.include) === null || _a === void 0 ? void 0 : _a.push({
                association: 'certificates',
                order: [['createdAt', 'DESC']]
            });
        }
        models_1.Tutor.findAll(options)
            .then((tutors) => {
            if (!id) {
                res.json({
                    status: 'success',
                    tutors
                });
            }
            else {
                res.json({
                    status: 'success',
                    tutor: (tutors.length > 0) ? tutors[0] : null
                });
            }
        })
            .catch((e) => {
            next({ error: e, custom: false });
        });
    }
    static tutorCertificate(req, res, next) {
        const { id } = res.locals;
        const options = {
            where: { id, status: [tutor_model_1.TutorStatus.UNVALIDATED, tutor_model_1.TutorStatus.REJECTED] },
            attributes: [],
            include: [
                {
                    association: 'certificates',
                    order: [['createdAt', 'DESC']],
                    required: true
                }
            ]
        };
        models_1.Tutor.findOne(options)
            .then((tutor) => {
            if (tutor) {
                const stream = file_service_1.default.download(tutor.certificates[0].key);
                stream.pipe(res);
            }
            else {
                next({ error: new Error('Usuario no encontrado'), custom: true });
            }
        })
            .catch((e) => {
            next({ error: e, custom: false });
        });
    }
    static tutorValidate(req, res, next) {
        const { id, status } = res.locals;
        const options = {
            where: {
                id,
                status: [tutor_model_1.TutorStatus.UNVALIDATED, tutor_model_1.TutorStatus.REJECTED]
            },
            include: [
                {
                    association: 'user',
                    required: true
                }
            ]
        };
        models_1.Tutor.findOne(options)
            .then((tutor) => {
            if (tutor) {
                if (status == 1)
                    tutor.update({ status: tutor_model_1.TutorStatus.ACTIVE });
                else
                    tutor.update({ status: tutor_model_1.TutorStatus.REJECTED });
                const params = {
                    status: status == 1 ? 'Aprobado' : 'Rechazado',
                    // @ts-ignore
                    firstname: tutor.user.firstname,
                    // @ts-ignore
                    lastname: tutor.user.lastname,
                    date: tutor.createdAt.toDateString()
                };
                res.render('templates/emails/validation-tutor', params, (err, html) => {
                    if (err) {
                        next({ error: err, custom: false });
                        return;
                    }
                    else {
                        email_service_1.default.sendEmail(new email_service_1.Email('Resultado de solicitud - Tutor en Casa', html))
                            .catch((e) => {
                            next({ error: e, custom: false });
                        });
                        res.json({ status: 'success' });
                    }
                });
            }
            else {
                next({ error: new Error('Tutor no existe o ya está validado'), custom: true });
            }
        })
            .catch((e) => {
            next({ error: e, custom: false });
        });
    }
    static create(req, res, next) { }
    static update(req, res, next) { }
    static destroy(req, res, next) { }
    static show(req, res, next) { }
    static logs(req, res, next) {
        const { top } = res.locals;
        log_model_1.default.findAll({ limit: top, order: [['createdAt', 'DESC']] })
            .then((logs) => {
            res.json({
                status: 'success',
                logs
            });
        })
            .catch((e) => {
            next({ error: e, custom: false });
        });
    }
    static reports(req, res, next) {
        //
    }
}
exports.default = AdministratorController;
