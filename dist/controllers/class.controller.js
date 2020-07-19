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
exports.ClassValidatorController = void 0;
const validator_1 = __importDefault(require("validator"));
const payment_service_1 = require("../services/payment.service");
const messages_1 = require("../config/messages");
const models_1 = require("../db/models");
const tutor_model_1 = require("../db/models/tutor.model");
const historystatusclass_model_1 = __importStar(require("../db/models/historystatusclass.model"));
const tutor_service_1 = __importDefault(require("../services/tutor.service"));
const logger_util_1 = __importDefault(require("../util/logger.util"));
const availabilitytime_model_1 = require("../db/models/availabilitytime.model");
class ClassValidatorController {
    static create(req, res, next) {
        if (!req.body.id_tutor || !req.body.id_theme || !req.body.date || !req.body.minutes)
            return next({ error: new Error(messages_1.requestMessage["params.missing"]), custom: true });
        const date = validator_1.default.toDate(req.body.date);
        if (!date)
            return next({ error: new Error('Formato fecha incorrecto'), custom: true });
        else if (!validator_1.default.isInt(req.body.minutes) || (req.body.minutes % 60) != 0)
            return next({ error: new Error('Formato del tiempo es incorrecto'), custom: true });
        res.locals.date = date;
        res.locals.minutes = req.body.minutes;
        res.locals.id_tutor = req.body.id_tutor;
        res.locals.id_theme = req.body.id_theme;
        next();
    }
    static join(req, res, next) {
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
    static rating(req, res, next) {
        if (!req.params.id || !req.body.value) {
            return next({ error: new Error(messages_1.requestMessage["params.missing"]), custom: true });
        }
        if (!validator_1.default.isInt(req.params.id) || !validator_1.default.isInt(req.body.value)) {
            return next({ error: new Error('El tipo de dato en inválido'), custom: true });
        }
        res.locals.id = req.params.id;
        res.locals.value = req.body.value;
        next();
    }
    static end(req, res, next) {
        if (!req.params.id) {
            return next({ error: new Error(messages_1.requestMessage["params.missing"]), custom: true });
        }
        res.locals.id = req.params.id;
        next();
    }
}
exports.ClassValidatorController = ClassValidatorController;
class ClassController {
    static create(req, res, next) {
        const { id_theme } = res.locals;
        // @ts-ignore
        const { id_tutor } = req.user;
        const date = res.locals.date;
        const minutes = res.locals.minutes;
        const options = {
            where: {
                id: id_tutor,
                status: tutor_model_1.TutorStatus.ACTIVE
            },
            include: [{
                    association: 'themes',
                    required: true,
                    where: {
                        id: id_theme
                    }
                }]
        };
        models_1.Tutor.findOne(options)
            .then((tutor) => {
            if (!tutor) {
                next({ error: new Error('El tutor no está habilitado'), custom: true });
                return;
            }
            // @ts-ignore
            else if (!tutor.themes[0].TutorTheme.price) {
                next({ error: new Error('El tutor no está habilitado'), custom: true });
                return;
            }
            // @ts-ignore
            const price = tutor.themes[0].TutorTheme.price * (minutes / 60);
            const total = price * (minutes / 60);
            tutor_service_1.default.isAvailable(id_tutor, date, minutes, true)
                .then((times) => {
                if (!times) {
                    next({ error: new Error('El tutor no está disponible el día seleccionado'), custom: true });
                    return;
                }
                models_1.Class.create({
                    id_tutor,
                    id_tutor_theme: 1,
                    price_hour: price
                })
                    .then((classI) => {
                    times.forEach((time) => {
                        time.update({ status: availabilitytime_model_1.AvailabilityTimeStatus.RESERVED })
                            .catch((e) => logger_util_1.default().error(e));
                        models_1.ClassTime.create({
                            id_class: classI.id,
                            id_availability_time: time.id
                        })
                            .catch((e) => logger_util_1.default().error(e));
                    });
                    payment_service_1.PaymentService.create(total, 'Pago por una clase')
                        .then((info) => {
                        res.json({
                            status: 'success',
                            times,
                            class: classI,
                            payment_url: info.khipu.payment_url
                        });
                    })
                        .catch((e) => {
                        next(e);
                    });
                })
                    .catch((e) => {
                    next({ error: e, custom: false });
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
    static join(req, res, next) {
        next();
    }
    static rating(req, res, next) {
        const { id, value } = res.locals;
        // @ts-ignore
        const id_user = req.user.id;
        models_1.ClassRating.create({
            id_class: id,
            id_user,
            value
        })
            .then((classRating) => {
            res.json({ status: 'success' });
        })
            .catch((e) => {
            next({ error: e, custom: false });
        });
    }
    static end(req, res, next) {
        const { id } = res.locals;
        historystatusclass_model_1.default.create({
            id_class: id,
            status: historystatusclass_model_1.HistoryStatusClassStatus.FINISHED
        })
            .then(() => {
            res.json({ status: 'success' });
        })
            .catch((e) => {
            next({ error: e, custom: false });
        });
    }
    static update(req, res, next) { }
    static destroy(req, res, next) { }
    static show(req, res, next) {
        // @ts-ignore
        const id = req.user.id;
        const options = {
            where: { id },
            attributes: [],
            include: [
                {
                    association: 'classes',
                    required: true,
                    through: {
                        attributes: []
                    },
                    include: [
                        {
                            association: 'tutor',
                            attributes: ['id'],
                            include: [
                                {
                                    association: 'user',
                                    attributes: ['firstname', 'lastname', 'email'],
                                    required: true
                                }
                            ],
                            required: true
                        },
                        {
                            association: 'statuses',
                            where: {
                                status: [historystatusclass_model_1.HistoryStatusClassStatus.UNPAY, historystatusclass_model_1.HistoryStatusClassStatus.PAY, historystatusclass_model_1.HistoryStatusClassStatus.STARTED]
                            },
                            order: [['createdAt', 'DESC']],
                            attributes: ['status'],
                            limit: 1,
                            required: true
                        },
                        {
                            association: 'times',
                            attributes: ['start', 'minutes'],
                            required: true,
                            through: {
                                attributes: []
                            }
                        }
                    ]
                }
            ]
        };
        models_1.User.findOne(options)
            .then((user) => {
            if (!user) {
                res.json({ status: 'success', classes: [] });
                return;
            }
            // @ts-ignore
            const classAll = user.classes.map((classI) => {
                // @ts-ignore
                const start = classI.times[0].start;
                let total = 0;
                // @ts-ignore
                for (let index = 0; index < classI.times.length; index++) {
                    // @ts-ignore
                    const time = classI.times[index];
                    total += time.minutes;
                }
                return {
                    id: classI.id,
                    // @ts-ignore
                    tutor: classI.tutor.user,
                    // @ts-ignore
                    status: classI.statuses[0].status,
                    price_hour: classI.price_hour,
                    start,
                    minutes: total,
                };
            });
            res.json({
                status: 'success',
                classes: classAll
            });
        })
            .catch((e) => {
            next({ error: e, custom: false });
        });
    }
}
exports.default = ClassController;
