"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const khipu_client_1 = require("khipu-client");
const payment_model_1 = __importStar(require("../db/models/payment.model"));
const logger_util_1 = __importDefault(require("../util/logger.util"));
const client = new khipu_client_1.Client({
    receiverId: process.env.KHIPU_ID || '',
    secret: process.env.KHIPU_KEY || '',
});
class PaymentService {
    static createKhipuPayment(payment) {
        return new Promise((resolve, reject) => {
            client.createPayment({
                amount: payment.value,
                subject: payment.subject,
                currency: 'CLP'
            })
                .then((paymentResponse) => __awaiter(this, void 0, void 0, function* () {
                yield payment.update({ token: paymentResponse.payment_id })
                    .catch((e) => {
                    logger_util_1.default().error(e, 'APP');
                });
                resolve(paymentResponse);
            }))
                .catch((e) => {
                reject({ error: e, custom: false });
            });
        });
    }
    static updateStatusPayment(payment, status) {
        if (payment.status != payment_model_1.PaymentStatus.PAID) {
            switch (status) {
                case 'verifying':
                    if (payment.status != payment_model_1.PaymentStatus.VERIFYING)
                        payment.update({ status: payment_model_1.PaymentStatus.VERIFYING })
                            .catch((e) => logger_util_1.default().error(e, 'APP'));
                    return payment_model_1.PaymentStatus.VERIFYING;
                case 'pending':
                    if (payment.status != payment_model_1.PaymentStatus.PENDING)
                        payment.update({ status: payment_model_1.PaymentStatus.PENDING })
                            .catch((e) => logger_util_1.default().error(e, 'APP'));
                    return payment_model_1.PaymentStatus.PENDING;
            }
        }
        return payment_model_1.PaymentStatus.PAID;
    }
    static create(amount, subject) {
        return new Promise((resolve, reject) => {
            payment_model_1.default.create({
                value: amount,
                status: payment_model_1.PaymentStatus.PENDING,
                currency: 'CLP',
                subject
            })
                .then((payment) => {
                this.createKhipuPayment(payment)
                    .then((info) => {
                    resolve({
                        payment,
                        khipu: info
                    });
                })
                    .catch((e) => {
                    reject(e);
                });
            })
                .catch((e) => {
                reject({ error: e, custom: false });
            });
        });
    }
    static pay(id) {
        return new Promise((resolve, reject) => {
            payment_model_1.default.findOne({ where: { id } })
                .then((payment) => {
                if (!payment)
                    return reject({ error: new Error('Pago no encontrado'), custom: true });
                this.createKhipuPayment(payment)
                    .then((info) => {
                    resolve({
                        payment,
                        khipu: info
                    });
                })
                    .catch((e) => {
                    reject(e);
                });
            })
                .catch((e) => {
                reject({ error: e, custom: false });
            });
        });
    }
    static paid(id, notificationToken) {
        return new Promise((resolve, reject) => {
            payment_model_1.default.findOne({ where: { id } })
                .then((payment) => {
                if (!payment)
                    return reject({ error: new Error('Pago no encontrado'), custom: true });
                client.confirmPayment(notificationToken)
                    .then((confirm) => {
                    payment.update({ status: payment_model_1.PaymentStatus.PAID });
                    resolve({ payment, message: confirm.message });
                })
                    .catch((e) => {
                    reject({ error: e, custom: false });
                });
            })
                .catch((e) => {
                reject({ error: e, custom: false });
            });
        });
    }
    static getInfoById(id) {
        return new Promise((resolve, reject) => {
            payment_model_1.default.findOne({ where: { id } })
                .then((payment) => {
                if (payment) {
                    client.getPayment(payment.token)
                        .then((info) => {
                        resolve({
                            payment,
                            khipu: info,
                            status: this.updateStatusPayment(payment, info.status)
                        });
                    })
                        .catch((e) => {
                        reject({ error: e, custom: false });
                    });
                }
                else {
                    reject({ error: new Error('El pago no existe'), custom: true });
                }
            })
                .catch((e) => {
                reject({ error: e, custom: false });
            });
        });
    }
    static getInfoByToken(token) {
        return new Promise((resolve, reject) => {
            payment_model_1.default.findOne({ where: { token } })
                .then((payment) => {
                if (payment) {
                    client.getPayment(payment.token)
                        .then((info) => {
                        this.updateStatusPayment(payment, info.status);
                        resolve({
                            payment,
                            khipu: info,
                            status: this.updateStatusPayment(payment, info.status)
                        });
                    })
                        .catch((e) => {
                        reject({ error: e, custom: false });
                    });
                }
                else {
                    reject({ error: new Error('El pago no existe'), custom: true });
                }
            })
                .catch((e) => {
                reject({ error: e, custom: false });
            });
        });
    }
    static getInfoByNotificationToken(token) {
        return new Promise((resolve, reject) => {
            client.getPaymentByNotificationToken(token)
                .then((info) => {
                payment_model_1.default.findOne({ where: { token: info.payment_id } })
                    .then((payment) => {
                    resolve({
                        payment,
                        khipu: info
                    });
                })
                    .catch((e) => {
                    reject({ error: e, custom: false });
                });
            })
                .catch((e) => {
                reject({ error: e, custom: false });
            });
        });
    }
}
exports.PaymentService = PaymentService;
exports.default = PaymentService;
