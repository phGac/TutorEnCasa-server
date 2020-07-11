import { Request, Response, NextFunction } from "express";
import { requestMessage, couponMessage } from "../config/messages";

import { User, Coupon, CouponGift } from '../db/models';
import logger from "../util/logger";
import PaymentService from "../services/payment.service";
import { FindOptions } from "sequelize/types";
import { PaymentStatus } from "../db/models/payment.model";
import validator from "validator";

class CouponValidatorController {
    static show(req: Request, res: Response, next: NextFunction) {
        res.locals.id = (req.params.id) ? req.params.id : undefined;
        next();
    }
    static create(req: Request, res: Response, next: NextFunction) {
        if(! req.body.value) {
            next({ error: requestMessage["params.missing"], custom: true });
            return;
        }
        res.locals.value = req.body.value;
        next();
    }
    static gift(req: Request, res: Response, next: NextFunction) {
        if(! req.params.id || ! req.body.to) {
            return next({ error: requestMessage["params.missing"], custom: true });
        }
        // @ts-ignore
        if(req.body.to == req.user.email) {
            return next({ error: couponMessage["user.email.self"], custom: true });
        }
        res.locals.id = req.params.id;
        res.locals.to = req.params.to;
        res.locals.message = (req.body.message) ? req.body.message : undefined;
        next();
    }
    static destroy(req: Request, res: Response, next: NextFunction) {
        next();
    }
    static status(req: Request, res: Response, next: NextFunction) {
        if(! req.params.id) {
            return next({ error: requestMessage["params.missing"], custom: true });
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
                    next({ error: 'No encontrado', custom: true });
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
        const { value } = res.locals;
        // @ts-ignore
        const id_user = req.user.id;
        PaymentService.create(value, 'Compra por un cupón')
            .then((info) => {
                Coupon.create({
                    id_user,
                    id_payment: info.payment.payment.id,
                    value
                })
                .then((coupon: Coupon) => {
                    res.json({ 
                        status: 'success', 
                        code: coupon.id,
                        url: info.payment.khipu.payment_url
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
                    next({ error: couponMessage["coupon.notFound"], custom: true });
                    return;
                }
                // @ts-ignore
                if(coupon.id_user !== req.user.id || coupon.gift) {
                    next({ error: couponMessage["coupon.owner.isAnother"], custom: true });
                    return;
                }
                User.findOne({ where: { email: to } })
                    .then((user) => {
                        if(! user) {
                            next({ error: couponMessage["user.notFound"], custom: true });
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