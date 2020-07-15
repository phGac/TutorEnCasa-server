import { Request, Response, NextFunction } from "express";
import { requestMessage, couponMessage } from "../config/messages";

import { User, Coupon, CouponGift } from '../db/models';
import logger from "../util/logger.util";
import PaymentService from "../services/payment.service";
import { FindOptions } from "sequelize/types";
import validator from "validator";

class CouponValidatorController {
    static show(req: Request, res: Response, next: NextFunction) {
        res.locals.id = (req.params.id) ? req.params.id : undefined;
        next();
    }
    static create(req: Request, res: Response, next: NextFunction) {
        if(! req.body.value) {
            next({ error: new Error(requestMessage["params.missing"]), custom: true });
            return;
        }
        else if(req.body.to) {
            if(! validator.isEmail(req.body.to)) {
                return next({ error: new Error('Formato de correo incorrecto'), custom: true });
            }
            User.findOne({ where: { email: req.body.to } })
                .then((user) => {
                    if(! user) {
                        next({ error: new Error('El usuario a regalar no existe'), custom: true });
                    }
                    else {
                        res.locals.value = req.body.value;
                        res.locals.to = user.id;
                        res.locals.message = (req.body.message) ? req.body.message : null;
                        next();
                    }
                })
                .catch((e) => {
                    next({ error: e, custom: false });
                });
        }
        else {
            res.locals.value = req.body.value;
            res.locals.to = undefined;
            res.locals.message = undefined;
            next();
        }
    }
    static gift(req: Request, res: Response, next: NextFunction) {
        if(! req.params.id || ! req.body.to) {
            return next({ error: new Error(requestMessage["params.missing"]), custom: true });
        }
        // @ts-ignore
        if(req.body.to == req.user.email) {
            return next({ error: new Error(couponMessage["user.email.self"]), custom: true });
        }
        res.locals.id = req.params.id;
        res.locals.to = req.params.to;
        res.locals.message = (req.body.message) ? req.body.message : null;
        next();
    }
    static destroy(req: Request, res: Response, next: NextFunction) {
        next();
    }
    static status(req: Request, res: Response, next: NextFunction) {
        if(! req.params.id) {
            return next({ error: new Error(requestMessage["params.missing"]), custom: true });
        }
        res.locals.id = req.params.id;
        next();
    }
}

class CouponController {
    static show(req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        const id_user = req.user?.id;
        const { id } = res.locals;
        const options: FindOptions = {
            attributes: [],
            where: { id: id_user },
            include: []
        };
        if(! id && options.include) {
            options.include.push(
                {
                    association: 'coupons',
                    attributes: [[ 'id', 'code' ], 'value', 'createdAt']
                },
                { 
                    association: 'gifts'
                }
            );
        }
        else if(options.include) {
            options.include.push({
                association: 'coupons',
                attributes: [[ 'id', 'code' ], 'value', 'createdAt'],
                include: [ { association: 'payment' } ],
                where: { id }
            });
        }
        User.findOne(options)
            .then((user) => {
                if(! user) {
                    next({ error: new Error('No encontrado'), custom: true });
                }
                else {
                    const info = user.get({ plain: true });
                    res.json({
                        status: 'success',
                        ...info
                    });
                }
            })
            .catch((e: Error) => {
                next({ error: e, custom: false });
            });
    }
    static create(req: Request, res: Response, next: NextFunction) {
        const { value, to, message } = res.locals;
        // @ts-ignore
        const id_user = req.user.id;
        PaymentService.create(value, 'Compra por un cupón')
            .then((info) => {
                Coupon.create({
                    id_user,
                    id_payment: info.payment.id,
                    value
                })
                .then((coupon: Coupon) => {
                    if(to) {
                        CouponGift.create({
                            id_coupon: coupon.id,
                            id_user: to,
                            message
                        })
                        .catch((e) => {
                            logger().error(e);
                        });
                    }
                    res.json({ 
                        status: 'success', 
                        code: coupon.id,
                        url: info.khipu.payment_url
                    });
                })
                .catch((e: Error) => {
                    next({ error: e, custom: false });
                });
            })
            .catch((e) => {
                next(e);
            });
    }
    static gift(req: Request, res: Response, next: NextFunction) {
        const { to, id, message } = res.locals;

        const couponOptions: FindOptions = {
            where: { id },
            include: [ 
                { 
                    association: 'user',
                    required: true,
                    attributes: []
                },
                { association: 'gift' }
            ]
        };
        Coupon.findOne(couponOptions)
            .then((coupon) => {
                if(! coupon) {
                    next({ error: new Error(couponMessage["coupon.notFound"]), custom: true });
                    return;
                }
                // @ts-ignore
                if(coupon.id_user !== req.user.id || coupon.gift) {
                    next({ error: new Error(couponMessage["coupon.owner.isAnother"]), custom: true });
                    return;
                }
                User.findOne({ where: { email: to } })
                    .then((user) => {
                        if(! user) {
                            next({ error: new Error(couponMessage["user.notFound"]), custom: true });
                            return;
                        }
                        CouponGift.create({
                            id_coupon: coupon.id,
                            id_user: user.id,
                            message
                        })
                        .catch((err: Error) => {
                            logger().error(err);
                        });
                        res.json({ status: 'success' });
                    })
                    .catch((err: Error) => {
                        next({ error: err, custom: false });
                    });
            })
            .catch((err: Error) => {
                next({ error: err, custom: false });
            });
        
    }
    static destroy(req: Request, res: Response, next: NextFunction) {
        //
    }
    static status(req: Request, res: Response, next: NextFunction) {
        const { id } = res.locals;
        const promise = (validator.isInt(id)) ? PaymentService.getInfoById(id) : PaymentService.getInfoByToken(id);
        promise.then((info) => {
            res.json({
                status: 'success',
                payment: {
                    value: info.payment.value,
                    currency: info.payment.currency,
                    subject: info.payment.subject,
                    status: info.status.toString(),
                    receipt_url: info.khipu.receipt_url,
                    payment_url: info.khipu.payment_url
                }
            });
        })
        .catch((e) => {
            next(e);
        });
    }
}

export {
    CouponValidatorController
}

export default CouponController;