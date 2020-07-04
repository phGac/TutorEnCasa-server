import { Request, Response, NextFunction } from "express";
import { requestMessage, couponMessage } from "../config/messages";
import Coupon from "../db/models/coupon";
import User from "../db/models/user";
import logger from "../util/logger";
import validator from "validator";

class CouponController {
    static show(req: Request, res: Response, next: NextFunction) {
        if(! req.params.id) {
            next({ error: requestMessage["params.missing"], custom: true });
            return;
        }
        const { id } = req.params;
        Coupon.findOne({ where: { id } })
            .then((coupon) => {
                res.json({ coupon });
            })
            .catch((e) => {
                next({ error: e, custom: false });
            });
    }
    static create(req: Request, res: Response, next: NextFunction) {
        if(! req.body.value) {
            next({ error: requestMessage["params.missing"], custom: true });
            return;
        }
        // @ts-ignore
        const id_user_from = req.user.id;
        const { value } = req.body;
        const message = (req.body.message) ? req.body.message : null;
        Coupon.create({
                id_user_from,
                message,
                value
            })
            .then((coupon) => {
                res.json({ status: 'success', code: coupon.id });
            })
            .catch((e) => {
                next({ error: e, custom: false });
            });
    }
    static update(req: Request, res: Response, next: NextFunction) {
        if(! req.body.to || ! req.body.code) {
            next({ error: requestMessage["params.missing"], custom: true });
            return;
        }
        // @ts-ignore
        if(req.body.to == req.user.email) {
            next({ error: couponMessage["user.email.self"], custom: true });
            return;
        }

        const { to, code } = req.body;
        const message = req.body.message;
        Coupon.findOne({ where: { id: code } })
            .then((coupon) => {
                if(! coupon) {
                    next({ error: couponMessage["coupon.notFound"], custom: true });
                    return;
                }
                // @ts-ignore
                if(coupon.id_user_from !== req.user.id) {
                    next({ error: couponMessage["coupon.owner.isAnother"], custom: true });
                    return;
                }
                User.findOne({ where: { email: to } })
                    .then((user) => {
                        if(! user) {
                            next({ error: couponMessage["user.notFound"], custom: true });
                            return;
                        }
                        coupon.update({
                            id_user_to: user.id,
                            message
                        })
                        .catch((err) => {
                            logger().error(err);
                        });
                        res.json({ status: 'success' });
                    })
                    .catch((err) => {
                        next({ error: err, custom: false });
                    });
            })
            .catch((err) => {
                next({ error: err, custom: false });
            });
        
    }
    static destroy(req: Request, res: Response, next: NextFunction) {
        //
    }
}

export default CouponController;