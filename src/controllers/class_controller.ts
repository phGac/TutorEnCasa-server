import { Request, Response, NextFunction } from "express";
import { FindOptions } from "sequelize/types";

import { PaymentService } from "../services/payment.service";
import { requestMessage } from "../config/messages";
import validator from "validator";
import { Tutor, Class, ClassTime } from "../db/models";
import { TutorStatus } from "../db/models/tutor.model";
import TutorService from "../services/tutor.service";
import logger from "../util/logger";
import { AvailabilityTimeStatus } from "../db/models/availabilitytime.model";

class ClassValidatorController {
    static create(req: Request, res: Response, next: NextFunction) {
        if(! req.body.id_tutor || ! req.body.id_theme || ! req.body.date || ! req.body.minutes)
            return next({ error: requestMessage["params.missing"], custom: true });
        
        const date = validator.toDate(req.body.date);
        if(! date)
            return next({ error: 'Formato fecha incorrecto', custom: true });
        else if(! validator.isInt(req.body.minutes) || (req.body.minutes % 60) != 0)
            return next({ error: 'Formato del tiempo es incorrecto', custom: true });

        res.locals.date = date;
        res.locals.minutes = req.body.minutes;
        res.locals.id_tutor = req.body.id_tutor;
        res.locals.id_theme = req.body.id_theme;
        next();
    }
    static join(req: Request, res: Response, next: NextFunction) {
        next();
    }
    static update(req: Request, res: Response, next: NextFunction) {
        next();
    }
    static destroy(req: Request, res: Response, next: NextFunction) {
        next();
    }
    static show(req: Request, res: Response, next: NextFunction) {
        next();
    }
}

class ClassController {
    static create(req: Request, res: Response, next: NextFunction) {
        const { id_theme } = res.locals;

        // @ts-ignore
        const { id_tutor } = req.user;
        const date: Date = res.locals.date;
        const minutes: number = res.locals.minutes;

        const options: FindOptions = {
            where: { 
                id: id_tutor,
                status: TutorStatus.ACTIVE
            },
            include: [{ 
                association: 'themes',
                required: true,
                where: {
                    id: id_theme
                }
            }]
        };
        Tutor.findOne(options)
            .then((tutor) => {
                if(! tutor) {
                    next({ error: 'El tutor no está habilitado', custom: true });
                    return;
                }
                // @ts-ignore
                else if(! tutor.themes[0].TutorTheme.price) {
                    next({ error: 'El tutor no está habilitado', custom: true });
                    return;
                }
                // @ts-ignore
                const price = tutor.themes[0].TutorTheme.price * (minutes / 60);
                const total = price * (minutes / 60);
                TutorService.isAvailable(id_tutor, date, minutes)
                    .then((times) => {
                        if(! times) {
                            next({ error: 'El tutor no está disponible el día seleccionado', custom: true });
                            return;
                        }
                        Class.create({
                            id_tutor,
                            id_tutor_theme: 1,
                            price_hour: price
                        })
                        .then((classI) => {
                            times.forEach((time) => {
                                time.update({ status: AvailabilityTimeStatus.RESERVED })
                                    .catch((e) => logger().error(e));
                                ClassTime.create({
                                        id_class: classI.id,
                                        id_availability_time: time.id
                                    })
                                    .catch((e) => logger().error(e));
                            });
                            PaymentService.create(total, 'Pago por una clase')
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
            .catch((e: Error) => {
                next({ error: e, custom: false });
            });
    }
    static join(req: Request, res: Response, next: NextFunction) {
        next();
    }
    static update(req: Request, res: Response, next: NextFunction) {}
    static destroy(req: Request, res: Response, next: NextFunction) {}
    static show(req: Request, res: Response, next: NextFunction) {}
}

export {
    ClassValidatorController
}

export default ClassController;