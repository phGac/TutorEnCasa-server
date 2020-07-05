import './config/env';
import './db';
import app from './app';
import logger from './util/logger';
import routes from './routes';

routes(app);

app.init(parseInt(process.env.PORT || '3000'), (port: number, err: Error|undefined) => {
    if(err) {
        logger().error(`Error on Start App: ${err.message}`, 'APP');
    }
    else {
        logger().info(`Server listening on port: ${port}`, 'APP');
    }
});