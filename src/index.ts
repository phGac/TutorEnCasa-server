import logger, { TypeLogger } from './util/logger';
import app from './app';

import indexRoutes from './routes/index_routes';
import userRoutes from './routes/user_routes';
import sessionRoutes from './routes/session_routes';

// configure Logger
logger(TypeLogger.CONSOLE).init({
    formatDate: new Intl.DateTimeFormat('es', {
        timeZone: 'America/Santiago',
        year: 'numeric', 
        month: 'short', 
        day: '2-digit', 
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }),
    //dirPath: path.join(__dirname, '..', 'log')
});

app.addRoutes('/', indexRoutes);
app.addRoutes('/api', sessionRoutes);
app.addRoutes('/api/user', userRoutes);

app.init(3000, (port: number, err: Error) => {
    if(err) {
        logger().error(`Error on Start App: ${err.message}`);
    }
    else {
        logger().info(`⚓  Server listening on port: ${port}  ⚓`);
    }
});