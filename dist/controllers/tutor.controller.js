"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorValidatorController = void 0;
const messages_1 = require("../config/messages");
const models_1 = require("../db/models");
const tutor_model_1 = require("../db/models/tutor.model");
const file_service_1 = __importDefault(require("../services/file.service"));
const validator_util_1 = require("../util/validator.util");
const logger_util_1 = __importDefault(require("../util/logger.util"));
class TutorValidatorController {
    static show(req, res, next) {
        res.locals.id = (req.params.id) ? parseInt(req.params.id) : undefined;
        next();
    }
    static create(req, res, next) {
        var _a;
        if (!req.files || !req.files.file || !req.body.type) {
            next({ error: new Error(messages_1.requestMessage["params.missing"]), custom: true });
            return;
        }
        if (Array.isArray(req.files.file) || req.files.file.mimetype != 'application/pdf') {
            next({ error: new Error('Formato de archivo no soportado'), custom: true });
            return;
        }
        // @ts-ignore
        const { birthdate } = req.user;
        if (!validator_util_1.hasMinNumberYears(birthdate, 18)) {
            return next({ error: new Error('No posees la edad mínima para solicitar ser tutor'), custom: true });
        }
        res.locals.type = req.body.type;
        res.locals.file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
        next();
    }
    static request(req, res, next) {
        next();
    }
    static validate(req, res, next) {
        res.locals.id = req.params.id;
        next();
    }
}
exports.TutorValidatorController = TutorValidatorController;
class TutorController {
    static show(req, res, next) {
        const { id } = res.locals;
        const options = {
            where: {},
            include: [
                {
                    association: 'user',
                    required: true
                },
                { association: 'themes' },
                { association: 'certificates' }
            ]
        };
        if (id) {
            options.where = { id };
        }
        models_1.Tutor.findAll(options)
            .then((tutors) => {
            if (tutors.length == 0 && id)
                return next({ error: new Error('Tutor no encontrado'), custom: true });
            if (id) {
                res.json({
                    status: 'success',
                    tutor: tutors[0]
                });
            }
            else {
                res.json({
                    status: 'success',
                    tutors
                });
            }
        })
            .catch((err) => {
            next({ error: err, custom: false });
        });
    }
    static request(req, res, next) {
        const options = {
            where: {
                status: tutor_model_1.TutorStatus.UNVALIDATED
            },
            include: [
                { association: 'user' },
                {
                    association: 'certificates',
                    limit: 1,
                    order: [['createdAt', 'DESC']]
                }
            ]
        };
        models_1.Tutor.findAll(options)
            .then((tutors) => {
            res.json({
                status: 'success',
                tutors
            });
        })
            .catch((err) => {
            next({ error: err, custom: false });
        });
    }
    static create(req, res, next) {
        // @ts-ignore
        const { id } = req.user;
        const { file, type } = res.locals;
        // @ts-ignore
        file_service_1.default.upload(file, req.user)
            .then((file) => {
            const tutorOptions = {
                id_user: id,
                status: tutor_model_1.TutorStatus.UNVALIDATED,
                certificates: [
                    {
                        name: file.name,
                        mime: file.mime,
                        key: file.key,
                        TutorFileCertificate: {
                            type
                        }
                    }
                ]
            };
            const options = {
                where: { id },
                include: [{
                        association: 'role_tutor',
                        required: true
                    }]
            };
            models_1.User.findOne(options)
                .then((user) => {
                if (user) {
                    // @ts-ignore
                    models_1.Tutor.update({ status: tutor_model_1.TutorStatus.UNVALIDATED }, { where: { id: user.role_tutor.id } })
                        .catch((e) => logger_util_1.default().error(e));
                    models_1.File.create({
                        name: file.name,
                        mime: file.mime,
                        key: file.key
                    }).then((f) => {
                        models_1.TutorFileCertificate.create({
                            id_file: f.id,
                            type,
                        })
                            .catch((e) => logger_util_1.default().error(e));
                    })
                        .catch((e) => logger_util_1.default().error(e));
                    res.json({ status: 'success', message: messages_1.tutorMessage["request.success"] });
                }
                else {
                    models_1.Tutor.create(tutorOptions, {
                        include: [
                            {
                                association: 'certificates',
                                include: [{ association: 'tutor_certificate' }]
                            },
                        ]
                    })
                        .then((tutor) => {
                        res.json({ status: 'success', message: messages_1.tutorMessage["request.success"] });
                    })
                        .catch((e) => {
                        next({ error: e, custom: false });
                    });
                }
            })
                .catch((e) => {
                next({ error: e, custom: false });
            });
        })
            .catch((e) => {
            next(e);
        });
    }
    static validate(req, res, next) {
        const { id } = res.locals;
        models_1.Tutor.update({
            status: tutor_model_1.TutorStatus.ACTIVE
        }, {
            where: {
                id,
                status: tutor_model_1.TutorStatus.UNVALIDATED
            }
        })
            .then((info) => {
            if (info[0] == 0) {
                next({ error: new Error('Tutor ya validado'), custom: true });
                return;
            }
            res.json({ status: 'success' });
        });
    }
    static addThemes(req, res, next) {
        if (!req.body.themes || !Array.isArray(req.body.themes)) {
            next({ error: new Error(messages_1.requestMessage["params.missing"]), custom: true });
            return;
        }
        // @ts-ignore
        const id_tutor = req.user.id_tutor;
        const { themes } = req.body;
        themes.forEach((data) => {
            models_1.Theme.findOrCreate({
                where: { name: data.name },
                defaults: {
                    name: data.name,
                    id_theme_parent: data.id_parent || 0
                }
            }).then((info) => {
                if (info[0]) {
                    models_1.TutorTheme.create({
                        id_theme: info[0].id,
                        id_tutor: id_tutor
                    });
                }
            });
        });
        res.json({ status: 'success' });
    }
}
exports.default = TutorController;
