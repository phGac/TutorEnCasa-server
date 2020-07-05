import request from 'supertest';

import '../src/config/env';
import '../src/db';
import app from '../src/app';
import routes from '../src/routes';

const globalData = {
    token: null,
    user: null,
};
beforeAll((done) => {
    routes(app);
    app.init(3000, async (port, err) => {
        if(err) {
            done(err);
        }
        else {
            request(app.getApp())
                .post('/api/login')
                .send({
                    email: 'pgac@email.com',
                    password: 'PASS@23pass'
                }).then((res) => {
                    globalData.token = res.body.token;
                    globalData.user = res.body.user;
                    done();
                });
        }
    });
}, 10000); // 10s

describe('Home', () => {
    it('/', (done) => {
        request(app.getApp())
            .get('/')
            .then((res) => {
                expect(res.status).toBe(302);
                expect(res.header['location']).toBe('/public/');
                done();
            });
    });
    it('/public/', (done) => {
        request(app.getApp())
            .get('/public/')
            .then((res) => {
                expect(res.status).toBe(200);
                expect(res.header['content-type']).toContain('text/html');
                done();
            });
    });
});

describe('User', () => {
    it('Show', (done) => {
        request(app.getApp())
            .get('/api/');
    });
});

afterAll((done) => {
    app.close(() => {
        done();
    });
});