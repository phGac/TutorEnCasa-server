"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityTimeController = exports.AvailabilityTimeValidatorController = void 0;
const models_1 = require("../db/models");
const messages_1 = require("../config/messages");
const validator_1 = __importDefault(require("validator"));
const tutor_service_1 = __importDefault(require("../services/tutor.service"));
const availabilitytime_model_1 = require("../db/models/availabilitytime.model");
const logger_util_1 = __importDefault(require("../util/logger.util"));
class AvailabilityTimeValidatorController {
    static show(req, res, next) {
        next();
    }
    static create(req, res, next) {
        if (!req.body.date || !req.body.minutes) {
            return next({ error: new Error(messages_1.requestMessage["params.missing"]), custom: true });
        }
        const date = validator_1.default.toDate(req.body.date);
        if (!date) {
            return next({ error: new Error('Formato de fecha incorrecto'), custom: true });
        }
        else if (!validator_1.default.isInt(req.body.minutes) || (req.body.minutes % 30) != 0) {
            return next({ error: new Error('Formato de minutos incorrecto'), custom: true });
        }
        res.locals.date = date;
        res.locals.minutes = req.body.minutes;
        next();
    }
    static update(req, res, next) {
        next();
    }
    static destroy(req, res, next) {
        next();
    }
}
exports.AvailabilityTimeValidatorController = AvailabilityTimeValidatorController;
class AvailabilityTimeController {
    static show(req, res, next) {
        // @ts-ignore
        const { id_tutor } = req.user;
        tutor_service_1.default.weekAvailableTimes(id_tutor)
            .then((times) => {
            times = tutor_service_1.default.mergeTimes(times);
            res.json({
                status: 'success',
                times
            });
        })
            .catch((e) => {
            next(e);
        });
    }
    static create(req, res, next) {
        const { date, minutes } = res.locals;
        const halfHours = (minutes / 30);
        // @ts-ignore
        const id_tutor = req.user.id_tutor;
        tutor_service_1.default.isAvailable(id_tutor, date, minutes, false)
            .then((times) => {
            if (times)
                return next({ error: 'El tiempo seleccionado está ocupado', custom: true });
            let lastStart = date;
            for (let index = 0; index < halfHours; index++) {
                const start = tutor_service_1.default.addMinutes(lastStart, 30);
                lastStart = start;
                models_1.AvailabilityTime.create({
                    id_tutor,
                    start,
                    minutes: 30,
                    status: availabilitytime_model_1.AvailabilityTimeStatus.ACTIVE
                })
                    .catch((e) => {
                    logger_util_1.default().error(e);
                });
            }
            res.json({ status: 'success' });
        })
            .catch((e) => {
            next(e);
        });
    }
    static update(req, res, next) { }
    static destroy(req, res, next) { }
}
exports.AvailabilityTimeController = AvailabilityTimeController;
