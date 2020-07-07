import request from 'supertest';

import '../src/config/env';
import '../src/db';
import app from '../src/app';
import routes from '../src/routes';

const globalData = {
    token: null,
    uid: null,
    tutors: []
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
                    globalData.uid = res.body.user.id;
                    done();
                });
        }
    });
}, 10000); // 10s

describe('Tutor', () => {
    it('Unvalidateds', (done) => {
        request(app.getApp())
            .get('/api/tutor/request')
            .send()
            .set({ 'access-token': globalData.token })
            .then((res) => {
                expect(res.status).toBe(200);
                expect(res.body.status).toBe('success');
                if(res.body.tutors)
                    globalData.tutors = res.body.tutors;
                done();
            });
    });
    it('Show', (done) => {
        request(app.getApp())
            .get(`/api/tutor/${globalData.tutors[0].id}`)
            .send()
            .set({ 'access-token': globalData.token })
            .then((res) => {
                expect(res.status).toBe(200);
                expect(res.body.status).toBe('success');
                done();
            });
    });
});

afterAll((done) => {
    app.close(() => {
        done();
    });
});