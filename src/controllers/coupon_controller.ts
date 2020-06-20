import { Request, Response, NextFunction } from "express";
import { requestMessage } from "../config/messages";
import Coupon from "../db/models/coupon";

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
        //
    }
    static destroy(req: Request, res: Response, next: NextFunction) {
        //
    }
}

export default CouponController;