import './config/env';
import './db';
import logger from './util/logger';
import app from './app';
import routes from './routes';

routes(app);

app.init(parseInt(process.env.PORT || '3000'), (port: number, err: Error) => {
    if(err) {
        logger().error(`Error on Start App: ${err.message}`, '');
    }
    else {
        logger().info(`Server listening on port: ${port}`);
    }
});