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

import { auth } from '../src/services/auth.service';

describe('Auth', () => {
    it('valid', async (done) => {
        auth('pgac@email.com', 'PASS@23pass')
            .then((user) => {
                done();
            })
            .catch((e) => {
                done(e.error);
            });
    });
    it('invalid password', async (done) => {
        auth('pgac@email.com', 'wrong-password')
            .then((user) => {
                done(new Error('Usuario autentificado'));
            })
            .catch((e) => {
                done();
            });
    });
    it('invalid user', async (done) => {
        auth('wrong@wrong.com', 'PASS@23pass')
            .then((user) => {
                done(new Error('Usuario autentificado'));
            })
            .catch((e) => {
                done();
            });
    });
    it('full invalid', async (done) => {
        auth('wrong@wrong.com', 'wrong-password')
            .then((user) => {
                done(new Error('Usuario autentificado'));
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