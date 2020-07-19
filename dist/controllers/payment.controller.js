"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = exports.PaymentValidatorController = void 0;
const payment_service_1 = __importDefault(require("../services/payment.service"));
class PaymentValidatorController {
    static confirm(req, res, next) {
        if (!req.query.api_version || !req.query.notification_token || req.query.notification_token != '1.3') {
            return next({ error: 'Petición no válida', custom: true });
        }
        res.locals.token = req.query.notification_token;
        next();
    }
}
exports.PaymentValidatorController = PaymentValidatorController;
class PaymentController {
    static confirm(req, res, next) {
        const { token } = res.locals;
        payment_service_1.default.getInfoByNotificationToken(token)
            .then((info) => {
            if (info.payment) {
                payment_service_1.default.paid(info.payment.id, token)
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
exports.PaymentController = PaymentController;
