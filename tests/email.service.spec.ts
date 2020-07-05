import '../src/config/env';
import '../src/db';
import app from '../src/app';
import routes from '../src/routes';

beforeAll((done) => {
    routes(app);
    app.init(3000, async (port, err) => {
        if(err) {
            done(err);
        }
        else {
            done();
        }
    });
}, 10000); // 10s

/*
import { EmailService, Email } from '../src/services/email_service';

describe('Email', () => {
    it('Send', (done) => {
        EmailService.sendEmail(new Email('Jest Test', 'This is a test'))
            .then((id) => {
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
});
*/

afterAll((done) => {
    app.close(() => {
        done();
    });
});