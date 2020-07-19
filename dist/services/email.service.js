"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = exports.EmailService = void 0;
const aws_sdk_1 = require("aws-sdk");
const ses = new aws_sdk_1.SES({
    accessKeyId: process.env.AWS_SES_IAM_ID,
    secretAccessKey: process.env.AWS_SES_IAM_SECRET,
    region: 'us-east-1'
});
class EmailService {
    static sendEmail(email) {
        return new Promise((resolve, reject) => {
            ses.sendEmail({
                Source: email.getFrom(),
                Destination: {
                    ToAddresses: email.getTo(),
                    CcAddresses: email.getCc(),
                    BccAddresses: email.getBcc()
                },
                Message: {
                    Subject: {
                        Charset: 'UTF-8',
                        Data: email.getSubject()
                    },
                    Body: {
                        Html: {
                            Charset: 'UTF-8',
                            Data: email.getBody()
                        }
                    }
                }
            }, function (err, data) {
                if (err)
                    return reject(err);
                resolve(data.MessageId);
            });
        });
    }
}
exports.EmailService = EmailService;
class Email {
    constructor(subject, body, to = undefined, from = undefined) {
        this.subject = subject;
        this.body = body;
        this.from = from || process.env.AWS_WORKMAIL_EMAIL || '';
        this.to = to || [process.env.AWS_WORKMAIL_TEST_EMAIL || ''];
        this.cc = [];
        this.bcc = [];
    }
    setBody(body) {
        this.body = body;
    }
    getBody() {
        return this.body;
    }
    setCc(cc) {
        this.cc = cc;
    }
    getSubject() {
        return this.subject;
    }
    getFrom() {
        return this.from;
    }
    getTo() {
        return this.to;
    }
    getCc() {
        return this.cc;
    }
    getBcc() {
        return this.bcc;
    }
}
exports.Email = Email;
exports.default = EmailService;
