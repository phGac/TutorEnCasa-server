import '../src/config/env';
import '../src/db';
import app from '../src/app';
import routes from '../src/routes';

describe('App', () => {
    it('Start', (done) => {
        routes(app);
        app.init(3000, async (port, err) => {
            if(err) {
                done(err);
            }
            else {
                done();
            }
        });
    }, 80000); // 8s
});

afterAll((done) => {
    app.close(() => {
        done();
    });
});