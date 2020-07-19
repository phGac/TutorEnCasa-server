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
exports.MeetingValidatorController = void 0;
const meeting_service_1 = __importDefault(require("../services/meeting.service"));
const messages_1 = require("../config/messages");
const logger_util_1 = __importDefault(require("../util/logger.util"));
const models_1 = require("../db/models");
const historystatusclass_model_1 = __importStar(require("../db/models/historystatusclass.model"));
const uuid_1 = require("uuid");
class MeetingValidatorController {
    static show(req, res, next) {
        next();
    }
    static create(req, res, next) {
        if (!req.body.id) {
            next({ error: new Error(messages_1.requestMessage["params.missing"]), custom: true });
            return;
        }
        res.locals.id = req.body.id;
        next();
    }
    static destroy(req, res, next) {
        if (!req.body.id) {
            next({ error: new Error(messages_1.requestMessage["params.missing"]), custom: true });
            return;
        }
        res.locals.id = req.body.id;
        next();
    }
    static join(req, res, next) {
        if (!req.body.id) {
            next({ error: new Error(messages_1.requestMessage["params.missing"]), custom: true });
            return;
        }
        res.locals.id = req.body.id;
        next();
    }
}
exports.MeetingValidatorController = MeetingValidatorController;
class MeetingController {
    static create(req, res, next) {
        const { id } = res.locals;
        // @ts-ignore
        const id_user = req.user.id;
        const options = {
            where: { id },
            include: [
                {
                    association: 'tutor',
                    attributes: ['id'],
                    include: [
                        {
                            association: 'user',
                            attributes: ['id'],
                            required: true
                        }
                    ],
                    required: true
                },
                {
                    association: 'statuses',
                    attributes: ['status'],
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
        };
        models_1.Class.findOne(options)
            .then((classI) => {
            if (!classI)
                return next({ error: new Error('Clase no encontrada'), custom: true });
            // @ts-ignore
            else if (classI.tutor.user.id != id_user)
                return next({ error: new Error('No tienes permisos para iniciar esta clase'), custom: true });
            // @ts-ignore
            else if (classI.statuses.length == 0 || classI.statuses.some((s) => s.status == historystatusclass_model_1.HistoryStatusClassStatus.STARTED || s.status == historystatusclass_model_1.HistoryStatusClassStatus.FINISHED || s.status == historystatusclass_model_1.HistoryStatusClassStatus.CANCELL))
                return next({ error: new Error('Clase terminada, iniciada o cancelada'), custom: true });
            let total = 0;
            // @ts-ignore
            for (let index = 0; index < classI.times.length; index++) {
                // @ts-ignore
                total += classI.times[index].minutes;
            }
            const roomId = uuid_1.v4();
            classI.update({ room: roomId })
                .catch((e) => logger_util_1.default().error(e));
            historystatusclass_model_1.default.create({
                id_class: classI.id,
                status: historystatusclass_model_1.HistoryStatusClassStatus.STARTED
            })
                .catch((e) => logger_util_1.default().error(e));
            meeting_service_1.default.create(roomId, 'sa-east-1')
                .then(() => {
                meeting_service_1.default.join(roomId)
                    .then((joinInfo) => {
                    res.json({
                        status: 'success',
                        joinInfo
                    });
                })
                    .catch(e => {
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
    static join(req, res, next) {
        const { id } = res.locals;
        models_1.Class.findOne({ where: { id } })
            .then((classI) => {
            if (!classI)
                return next({ error: new Error('Clase no encontrada'), custom: true });
            meeting_service_1.default.join(classI.room)
                .then((joinInfo) => {
                res.json({
                    status: 'success',
                    joinInfo
                });
            })
                .catch(e => {
                next(e);
            });
        })
            .catch((e) => {
            next({ error: e, custom: false });
        });
    }
    static destroy(req, res, next) {
        const { id } = res.locals;
        const options = {
            where: { id },
            include: [{ association: 'statusses' }]
        };
        models_1.Class.findOne(options)
            .then((classI) => {
            if (!classI)
                return next({ error: new Error('La clase no existe'), custom: true });
            // @ts-ignore
            else if (classI.statusses.some((s) => s.status == historystatusclass_model_1.HistoryStatusClassStatus.FINISHED || s.status == historystatusclass_model_1.HistoryStatusClassStatus.CANCELL))
                return next({ error: new Error('La clase terminó o fue cancelada'), custom: true });
            meeting_service_1.default.destroy(id);
            res.json({ status: 'success' });
        })
            .catch((e) => {
            next({ error: e, custom: false });
        });
    }
}
exports.default = MeetingController;
