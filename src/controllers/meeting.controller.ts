import { Request, Response, NextFunction } from "express";
import MeetingService from "../services/meeting.service";
import { requestMessage } from "../config/messages";
import logger from "../util/logger.util";
import { Class } from "../db/models";
import { FindOptions } from "sequelize/types";
import HistoryStatusClass, { HistoryStatusClassStatus } from "../db/models/historystatusclass.model";
import { v4 as uuid } from "uuid";

class MeetingValidatorController {
    static show(req: Request, res: Response, next: NextFunction) {
        next();
    }
    static create(req: Request, res: Response, next: NextFunction) {
        if(! req.body.id) {
            next({ error: new Error(requestMessage["params.missing"]), custom: true });
            return;
        }
        res.locals.id = req.body.id;
        next();
    }
    static destroy(req: Request, res: Response, next: NextFunction) {
        if(! req.body.id) {
            next({ error: new Error(requestMessage["params.missing"]), custom: true });
            return;
        }
        res.locals.id = req.body.id;
        next();
    }
    static join(req: Request, res: Response, next: NextFunction) {
        if(! req.body.id) {
            next({ error: new Error(requestMessage["params.missing"]), custom: true });
            return;
        }
        res.locals.id = req.body.id;
        next();
    }
}

class MeetingController {
    static create(req: Request, res: Response, next: NextFunction) {
        const { id } = res.locals;
        // @ts-ignore
        const id_user = req.user.id;
        const options: FindOptions = {
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
        Class.findOne(options)
            .then((classI) => {
                if(! classI) return next({ error: new Error('Clase no encontrada'), custom: true });
                // @ts-ignore
                else if(classI.tutor.user.id != id_user) 
                    return next({ error: new Error('No tienes permisos para iniciar esta clase'), custom: true });
                // @ts-ignore
                else if(classI.statuses.length == 0 || classI.statuses.some((s) => s.status == HistoryStatusClassStatus.STARTED || s.status == HistoryStatusClassStatus.FINISHED || s.status == HistoryStatusClassStatus.CANCELL))
                    return next({ error: new Error('Clase terminada, iniciada o cancelada'), custom: true });
                
                let total = 0;
                // @ts-ignore
                for (let index = 0; index < classI.times.length; index++) {
                    // @ts-ignore
                    total += classI.times[index].minutes;
                }
                const roomId = uuid();
                classI.update({ room: roomId })
                    .catch((e) => logger().error(e));
                HistoryStatusClass.create({
                    id_class: classI.id,
                    status: HistoryStatusClassStatus.STARTED
                })
                .catch((e) => logger().error(e));
                MeetingService.create(roomId, 'sa-east-1')
                    .then(() => {
                        MeetingService.join(roomId)
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

    static join(req: Request, res: Response, next: NextFunction) {
        const { id } = res.locals;
        Class.findOne({ where: { id } })
            .then((classI) => {
                if(! classI) return next({ error: new Error('Clase no encontrada'), custom: true });
                MeetingService.join(classI.room)
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

    static destroy(req: Request, res: Response, next: NextFunction) {
        const { id } = res.locals;
        const options: FindOptions = {
            where: { id },
            include: [ { association: 'statusses' } ]
        };
        Class.findOne(options)
            .then((classI) => {
                if(! classI) return next({ error: new Error('La clase no existe'), custom: true });
                // @ts-ignore
                else if(classI.statusses.some((s) => s.status == HistoryStatusClassStatus.FINISHED || s.status == HistoryStatusClassStatus.CANCELL))
                    return next({ error: new Error('La clase terminó o fue cancelada'), custom: true });
                MeetingService.destroy(id);
                res.json({ status: 'success' });
            })
            .catch((e) => {
                next({ error: e, custom: false });
            });
    }
}

export {
    MeetingValidatorController
}

export default MeetingController;