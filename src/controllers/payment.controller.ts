import { Request, Response, NextFunction } from "express";
import PaymentService from "../services/payment.service";

class PaymentValidatorController {
    static confirm(req: Request, res: Response, next: NextFunction) {
        if(! req.query.api_version || ! req.query.notification_token || req.query.notification_token != '1.3') {
            return next({ error: 'Petición no válida', custom: true });
        }

        res.locals.token = req.query.token;
        next();
    }
}

class PaymentController {
    static confirm(req: Request, res: Response, next: NextFunction) {
        const { token } = res.locals;

        PaymentService.getInfoByNotificationToken(token)
            .then((info) => {
                if(info.payment) {
                    PaymentService.paid(info.payment.id, token)
                        .then((infoPaid) => {
                            res.json({ status: 'success' });
                        })
                        .catch((e) => {
                            next(e);
                        });
                }
            })
            .catch((e) => {
                next(e);
            });
    }
}

export {
    PaymentValidatorController,
    PaymentController
}