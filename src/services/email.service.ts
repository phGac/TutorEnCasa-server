import { SES, AWSError } from 'aws-sdk';

const ses = new SES({
    accessKeyId: process.env.AWS_SES_IAM_ID,
    secretAccessKey: process.env.AWS_SES_IAM_SECRET,
    region: 'us-east-1'
});

class EmailService {
    static sendEmail(email: Email) {
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
                }, 
                function(err: AWSError, data: SES.SendEmailResponse) {
                    if(err) return reject(err);
                    resolve(data.MessageId);
                }
            );
        });
    }
}

class Email {
    private from: string;
    private to: string[];
    private cc: string[];
    private bcc: string[];
    private subject: string;
    private body: string;

    constructor(subject: string, body: string, to: string[]|undefined = undefined, from: string|undefined = undefined) {
        this.subject = subject;
        this.body = body;
        this.from = from || process.env.AWS_WORKMAIL_EMAIL || '';
        this.to = to || [ process.env.AWS_WORKMAIL_TEST_EMAIL || '' ];
        this.cc = [];
        this.bcc = [];
    }

    setBody(body: string) {
        this.body = body;
    }

    getBody() {
        return this.body;
    }

    setCc(cc: string[]) {
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

export {
    EmailService,
    Email
}

export default EmailService;