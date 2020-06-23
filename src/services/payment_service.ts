import { Client, CreatePaymentResponse } from 'khipu-client';
import PaymentModel, { PaymentStatus } from '../db/models/payment';
import BankResponse from 'khipu-client/dist/banksResponse';

const client =  new Client({
    receiverId: process.env.KHIPU_ID || '',
    secret: process.env.KHIPU_KEY || '',
});

class PaymentService {
    static create(amount: number) {
        return new Promise((resolve: (data: { banks: BankResponse['banks'], payment: PaymentModel }) => void, reject) => {
            client.getBanks()
                .then((banks) => {
                    PaymentModel.create({
                        id_payment_method: 1,
                        value: amount,
                        status: PaymentStatus.UNPAID,
                        currency: 'CLP'
                    }, { raw: true })
                    .then((payment) => {
                        resolve({ banks: banks.banks, payment });
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

    static pay(id: string, subject: string) {
        return new Promise((resolve: (pay: CreatePaymentResponse) => void, reject) => {
            PaymentModel.findOne({ where: { id } })
                .then((payment) => {
                    if(! payment) return reject({ error: 'Pago no encontrado', custom: true });
                    client.createPayment({
                        amount: payment.value,
                        subject,
                        currency: 'CLP'
                    })
                    .then(async (paymentResponse) => {
                        await payment.update({ token: paymentResponse.payment_id });
                        resolve(paymentResponse);
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

    static paid(id: string) {
        return new Promise((resolve: (info: { payment: PaymentModel, message: string }) => void, reject) => {
            PaymentModel.findOne({ where: { id } })
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
}

export { 
    PaymentService
};

export default PaymentService;