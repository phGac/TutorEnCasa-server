"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponValidatorController = void 0;
const messages_1 = require("../config/messages");
const models_1 = require("../db/models");
const logger_util_1 = __importDefault(require("../util/logger.util"));
const payment_service_1 = __importDefault(require("../services/payment.service"));
const validator_1 = __importDefault(require("validator"));
class CouponValidatorController {
    static show(req, res, next) {
        res.locals.id = (req.params.id) ? req.params.id : undefined;
        next();
    }
    static create(req, res, next) {
        if (!req.body.value) {
            next({ error: new Error(messages_1.requestMessage["params.missing"]), custom: true });
            return;
        }
        else if (req.body.to) {
            if (!validator_1.default.isEmail(req.body.to)) {
                return next({ error: new Error('Formato de correo incorrecto'), custom: true });
            }
            models_1.User.findOne({ where: { email: req.body.to } })
                .then((user) => {
                if (!user) {
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
    static gift(req, res, next) {
        if (!req.params.id || !req.body.to) {
            return next({ error: new Error(messages_1.requestMessage["params.missing"]), custom: true });
        }
        // @ts-ignore
        if (req.body.to == req.user.email) {
            return next({ error: new Error(messages_1.couponMessage["user.email.self"]), custom: true });
        }
        res.locals.id = req.params.id;
        res.locals.to = req.params.to;
        res.locals.message = (req.body.message) ? req.body.message : null;
        next();
    }
    static destroy(req, res, next) {
        next();
    }
    static status(req, res, next) {
        if (!req.params.id) {
            return next({ error: new Error(messages_1.requestMessage["params.missing"]), custom: true });
        }
        res.locals.id = req.params.id;
        next();
    }
}
exports.CouponValidatorController = CouponValidatorController;
class CouponController {
    static show(req, res, next) {
        var _a;
        // @ts-ignore
        const id_user = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { id } = res.locals;
        const options = {
            attributes: [],
            where: { id: id_user },
            include: []
        };
        if (!id && options.include) {
            options.include.push({
                association: 'coupons',
                attributes: [['id', 'code'], 'value', 'createdAt']
            }, {
                association: 'gifts'
            });
        }
        else if (options.include) {
            options.include.push({
                association: 'coupons',
                attributes: [['id', 'code'], 'value', 'createdAt'],
                include: [{ association: 'payment' }],
                where: { id }
            });
        }
        models_1.User.findOne(options)
            .then((user) => {
            if (!user) {
                next({ error: new Error('No encontrado'), custom: true });
            }
            else {
                const info = user.get({ plain: true });
                res.json(Object.assign({ status: 'success' }, info));
            }
        })
            .catch((e) => {
            next({ error: e, custom: false });
        });
    }
    static create(req, res, next) {
        const { value, to, message } = res.locals;
        // @ts-ignore
        const id_user = req.user.id;
        payment_service_1.default.create(value, 'Compra por un cupón')
            .then((info) => {
            models_1.Coupon.create({
                id_user,
                id_payment: info.payment.id,
                value
            })
                .then((coupon) => {
                if (to) {
                    models_1.CouponGift.create({
                        id_coupon: coupon.id,
                        id_user: to,
                        message
                    })
                        .catch((e) => {
                        logger_util_1.default().error(e);
                    });
                }
                res.json({
                    status: 'success',
                    code: coupon.id,
                    url: info.khipu.payment_url
                });
            })
                .catch((e) => {
                next({ error: e, custom: false });
            });
        })
            .catch((e) => {
            next(e);
        });
    }
    static gift(req, res, next) {
        const { to, id, message } = res.locals;
        const couponOptions = {
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
        models_1.Coupon.findOne(couponOptions)
            .then((coupon) => {
            if (!coupon) {
                next({ error: new Error(messages_1.couponMessage["coupon.notFound"]), custom: true });
                return;
            }
            // @ts-ignore
            if (coupon.id_user !== req.user.id || coupon.gift) {
                next({ error: new Error(messages_1.couponMessage["coupon.owner.isAnother"]), custom: true });
                return;
            }
            models_1.User.findOne({ where: { email: to } })
                .then((user) => {
                if (!user) {
                    next({ error: new Error(messages_1.couponMessage["user.notFound"]), custom: true });
                    return;
                }
                models_1.CouponGift.create({
                    id_coupon: coupon.id,
                    id_user: user.id,
                    message
                })
                    .catch((err) => {
                    logger_util_1.default().error(err);
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
    static destroy(req, res, next) {
        //
    }
    static status(req, res, next) {
        const { id } = res.locals;
        const promise = (validator_1.default.isInt(id)) ? payment_service_1.default.getInfoById(id) : payment_service_1.default.getInfoByToken(id);
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
exports.default = CouponController;
