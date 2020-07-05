import { Request, Response, NextFunction } from "express";
import { FindOptions } from "sequelize/types";

import { PaymentService } from "../services/payment.service";
import { requestMessage } from "../config/messages";
import validator from "validator";
import { Tutor } from "../db/models";

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
        const { date, minutes, id_tutor, id_theme } = res.locals;

        const options: FindOptions = {
            where: { id: id_tutor },
            include: [
                { 
                    association: 'themes',
                    //where: { id: id_theme }
                },
                { association: 'times' }
            ]
        };
        Tutor.findOne(options)
            .then((tutor) => {
                if(! tutor) return next({ error: 'El tutor no se ha encontrado', custom: true });
                // validar si está disponible el tutor
                res.json({ tutor });
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
    static update(req: Request, res: Response, next: NextFunction) {}
    static destroy(req: Request, res: Response, next: NextFunction) {}
    static show(req: Request, res: Response, next: NextFunction) {}
}

export {
    ClassValidatorController
}

export default ClassController;