import { Request, Response, NextFunction } from "express";
import { AvailabilityTime } from "../db/models";
import { FindOptions, Op } from "sequelize";
import { requestMessage } from "../config/messages";
import validator from "validator";
import TutorService from "../services/tutor.service";
import { AvailabilityTimeStatus } from "../db/models/availabilitytime.model";
import logger from "../util/logger.util";

class AvailabilityTimeValidatorController {
    static show(req: Request, res: Response, next: NextFunction) {
        next();
    }

    static create(req: Request, res: Response, next: NextFunction) {
        if(! req.body.date || ! req.body.minutes) {
            return next({ error: new Error(requestMessage["params.missing"]), custom: true });
        }

        const date = validator.toDate(req.body.date);
        if(! date) {
            return next({ error: new Error('Formato de fecha incorrecto'), custom: true });
        }
        else if(! validator.isInt(req.body.minutes) || (req.body.minutes % 30) != 0) {
            return next({ error: new Error('Formato de minutos incorrecto'), custom: true });
        }

        res.locals.date = date;
        res.locals.minutes = req.body.minutes;
        next();
    }

    static update(req: Request, res: Response, next: NextFunction) {
        next();
    }

    static destroy(req: Request, res: Response, next: NextFunction) {
        next();
    }
}

class AvailabilityTimeController {
    static show(req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        const { id_tutor } = req.user;
        TutorService.weekAvailableTimes(id_tutor)
            .then((times) => {
                times = TutorService.mergeTimes(times);
                res.json({
                    status: 'success',
                    times
                });
            })
            .catch((e) => {
                next(e);
            });
    }

    static create(req: Request, res: Response, next: NextFunction) {
        const { date, minutes } = res.locals;
        const halfHours = (minutes / 30);
        // @ts-ignore
        const id_tutor = req.user.id_tutor;

        TutorService.isAvailable(id_tutor, date, minutes, false)
            .then((times) => {
                if(times) return next({ error: 'El tiempo seleccionado está ocupado', custom: true });
                let lastStart = date;
                for (let index = 0; index < halfHours; index++) {
                    const start = TutorService.addMinutes(lastStart, 30);
                    lastStart = start;
                    AvailabilityTime.create({ 
                        id_tutor, 
                        start, 
                        minutes: 30, 
                        status: AvailabilityTimeStatus.ACTIVE
                    })
                    .catch((e) => {
                        logger().error(e);
                    });
                }
                res.json({ status: 'success' });
            })
            .catch((e) => {
                next(e);
            });
    }

    static update(req: Request, res: Response, next: NextFunction) {}
    static destroy(req: Request, res: Response, next: NextFunction) {}
}

export {
    AvailabilityTimeValidatorController,
    AvailabilityTimeController
}