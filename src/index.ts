import logger, { TypeLogger } from './util/logger';
import app from './app';
import routes from './routes';

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

routes(app);

app.init(parseInt(process.env.PORT || ''), (port: number, err: Error) => {
    if(err) {
        logger().error(`Error on Start App: ${err.message}`);
    }
    else {
        logger().info(`⚓  Server listening on port: ${port}  ⚓`);
    }
});