"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../config/messages");
const coupon_1 = __importDefault(require("../db/models/coupon"));
const user_1 = __importDefault(require("../db/models/user"));
const logger_1 = __importDefault(require("../util/logger"));
class CouponController {
    static show(req, res, next) {
        if (!req.params.id) {
            next({ error: messages_1.requestMessage["params.missing"], custom: true });
            return;
        }
        const { id } = req.params;
        coupon_1.default.findOne({ where: { id } })
            .then((coupon) => {
            res.json({ coupon });
        })
            .catch((e) => {
            next({ error: e, custom: false });
        });
    }
    static create(req, res, next) {
        if (!req.body.value) {
            next({ error: messages_1.requestMessage["params.missing"], custom: true });
            return;
        }
        // @ts-ignore
        const id_user_from = req.user.id;
        const { value } = req.body;
        const message = (req.body.message) ? req.body.message : null;
        coupon_1.default.create({
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
    static update(req, res, next) {
        if (!req.body.to || !req.body.code) {
            next({ error: messages_1.requestMessage["params.missing"], custom: true });
            return;
        }
        // @ts-ignore
        if (req.body.to == req.user.email) {
            next({ error: messages_1.couponMessage["user.email.self"], custom: true });
            return;
        }
        const { to, code } = req.body;
        const message = req.body.message;
        coupon_1.default.findOne({ where: { id: code } })
            .then((coupon) => {
            if (!coupon) {
                next({ error: messages_1.couponMessage["coupon.notFound"], custom: true });
                return;
            }
            // @ts-ignore
            if (coupon.id_user_from !== req.user.id) {
                next({ error: messages_1.couponMessage["coupon.owner.isAnother"], custom: true });
                return;
            }
            user_1.default.findOne({ where: { email: to } })
                .then((user) => {
                if (!user) {
                    next({ error: messages_1.couponMessage["user.notFound"], custom: true });
                    return;
                }
                coupon.update({
                    id_user_to: user.id,
                    message
                })
                    .catch((err) => {
                    logger_1.default().error(err);
                });
                res.json({ status: 'success' });
            })
                .catch((err) => {
                next({ error: err, custom: false });
            });
        });
    }
    static destroy(req, res, next) {
        //
    }
}
exports.default = CouponController;
