import { Request, Response, NextFunction } from "express";
import { FindOptions } from "sequelize/types";

import { PaymentService } from "../services/payment.service";
import { requestMessage } from "../config/messages";
import validator from "validator";
import { Tutor, Class } from "../db/models";
import { TutorStatus } from "../db/models/tutor.model";
import TutorService from "../services/tutor.service";

class ClassValidatorController {
    static create(req: Request, res: Response, next: NextFunction) {
        if(! req.body.id_tutor || ! req.body.id_theme || ! req.body.date || ! req.body.minutes)
            return next({ error: requestMessage["params.missing"], custom: true });
        
        const date = validator.toDate(req.body.date);
        if(! date)
            return next({ error: 'Formato fecha incorrecto', custom: true });

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
            include: [{ association: 'themes' }]
        };
        Tutor.findOne(options)
            .then((tutor) => {
                if(! tutor) {
                    next({ error: 'El tutor no está habilitado', custom: true });
                    return;
                }
                const finish = TutorService.addMinutes(date, minutes);
                TutorService.isAvailable(id_tutor, {
                    day: date.getDay(),
                    start: date,
                    finish
                })
                .then((id_time) => {
                    if(! id_time) {
                        next({ error: 'El tutor no dispone de tiempo para la clase', custom: true });
                        return;
                    }
                    Class.create({
                        id_tutor,
                        start: date,
                        finish
                    });
                    res.json({ status: 'success' });
                });
            })
            .catch((e) => {
                next({ error: e, custom: false });
            });
        /*
        PaymentService.create(300)
            .then((info) => {
                PaymentService.pay(info.payment.id, 'El pago por una clase')
                    .then((payInfo) => {
                        res.json(payInfo);
                    })
                    .catch((e) => {
                        next({ error: e, custom: false });
                    });
            })
            .catch((e) => {
                next(e);
            });
        */
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