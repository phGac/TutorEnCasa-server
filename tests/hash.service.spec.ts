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

import { encryptPassword } from '../src/services/hash_service';

describe('Encrypt Password', () => {
    it('Secure', (done) => {
        encryptPassword('TQscY.e@98')
            .then((hash) => {
                done();
            })
            .catch((e) => {
                done(e.error);
            });
    });
    it('Insecure', (done) => {
        encryptPassword('abcdefg1')
            .then((hash) => {
                done(new Error('Hash creado'));
            })
            .catch((e) => {
                done();
            });
    });
    it('Too short', (done) => {
        encryptPassword('TQsc')
            .then((hash) => {
                done(new Error('Hash creado'));
            })
            .catch((e) => {
                done();
            });
    });
});

afterAll((done) => {
    app.close(() => {
        done();
    });
});