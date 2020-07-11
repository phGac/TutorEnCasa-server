import { Client, CreatePaymentResponse, PaymentResponse } from 'khipu-client';
import Payment, { PaymentStatus } from '../db/models/payment.model';
import BankResponse from 'khipu-client/dist/banksResponse';
import logger from '../util/logger';

const client =  new Client({
    receiverId: process.env.KHIPU_ID || '',
    secret: process.env.KHIPU_KEY || '',
});

class PaymentService {
    private static createKhipuPayment(payment: Payment) {
        return new Promise((resolve: (info: CreatePaymentResponse) => void, reject) => {
            client.createPayment({
                amount: payment.value,
                subject: payment.subject,
                currency: 'CLP'
            })
            .then(async (paymentResponse) => {
                await payment.update({ token: paymentResponse.payment_id })
                    .catch((e) => {
                        logger().error(e, 'APP');
                    });
                resolve(paymentResponse);
            })
            .catch((e) => {
                reject({ error: e, custom: false });
            });
        });
    }
    private static updateStatusPayment(payment: Payment, status: string) {
        if(payment.status != PaymentStatus.PAID) {
            switch(status) {
                case 'done':
                    this.paid(payment.id);
                    return PaymentStatus.PAID;
                case 'verifying': 
                    if(payment.status != PaymentStatus.VERIFYING)
                        payment.update({ status: PaymentStatus.VERIFYING })
                            .catch((e) => logger().error(e, 'APP'));
                    return PaymentStatus.VERIFYING;
                case 'pending':
                    if(payment.status != PaymentStatus.PENDING)
                        payment.update({ status: PaymentStatus.PENDING })
                            .catch((e) => logger().error(e, 'APP'));
                    return PaymentStatus.PENDING;
            }
        }
        return PaymentStatus.PAID;
    }
    static create(amount: number, subject: string) {
        return new Promise((resolve: (data: { payment: Payment, khipu: CreatePaymentResponse }) => void, reject) => {
            Payment.create({
                value: amount,
                status: PaymentStatus.PENDING,
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

    static pay(id: string) {
        return new Promise((resolve: (info: { payment: Payment, khipu: CreatePaymentResponse }) => void, reject) => {
            Payment.findOne({ where: { id } })
                .then((payment) => {
                    if(! payment) return reject({ error: 'Pago no encontrado', custom: true });
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

    static paid(id: string) {
        return new Promise((resolve: (info: { payment: Payment, message: string }) => void, reject) => {
            Payment.findOne({ where: { id } })
                .then((payment) => {
                    if(! payment) return reject({ error: 'Pago no encontrado', custom: true });
                    client.confirmPayment(payment.token)
                        .then((confirm) => {
                            payment.update({ status: PaymentStatus.PAID });
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

    static getInfoById(id: number) {
        return new Promise((resolve: (info: { payment: Payment, khipu: PaymentResponse, status: PaymentStatus }) => void, reject) => {
            Payment.findOne({ where: { id } })
                .then((payment) => {
                    if(payment) {
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
                        reject({ error: 'El pago no existe', custom: true });
                    }
                })
                .catch((e) => {
                    reject({ error: e, custom: false });
                });
        });
    }

    static getInfoByToken(token: string) {
        return new Promise((resolve: (info: { payment: Payment, khipu: PaymentResponse, status: PaymentStatus }) => void, reject) => {
            Payment.findOne({ where: { token } })
                .then((payment) => {
                    if(payment) {
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
                        reject({ error: 'El pago no existe', custom: true });
                    }
                })
                .catch((e) => {
                    reject({ error: e, custom: false });
                });
        });
    }
}

export { 
    PaymentService
};

export default PaymentService;