"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../config/messages");
const coupon_1 = __importDefault(require("../db/models/coupon"));
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
        var _a;
        if (!req.body.value) {
            next({ error: messages_1.requestMessage["params.missing"], custom: true });
            return;
        }
        // @ts-ignore
        const id_user_from = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
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
        //
    }
    static destroy(req, res, next) {
        //
    }
}
exports.default = CouponController;
