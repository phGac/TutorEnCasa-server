import path from 'path';
import logger, { TypeLogger } from './util/logger';
import indexRoutes from './routes/index';
import userRoutes from './routes/user';
import app from './app';

// configure Logger
logger(TypeLogger.FILE).init({
    formatDate: new Intl.DateTimeFormat('es', {
        timeZone: 'America/Santiago',
        year: 'numeric', 
        month: 'short', 
        day: '2-digit', 
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }),
    dirPath: path.join(__dirname, '..', 'log')
});

app.addRoutes('/', indexRoutes);
app.addRoutes('/user', userRoutes);

app.init(3000, (port: number, err: Error) => {
    if(err) {
        logger().error(`Error on Start App: ${err.message}`);
    }
    else {
        logger().info(`⚓  Server listening on port: ${port}  ⚓`);
    }
});