import fs from 'fs';
import path from 'path';
import Log from '../db/models/log';
import { Request, Response, NextFunction } from 'express';

export interface ILoggerConfig {
    level: 'INFO'|'WARNING'|'ERROR';
}

interface ILogger {
    configure(config: ILoggerConfig): (req: Request, res: Response, next: NextFunction) => void;
    log(level: string, message: string, type?: string): void;
    info(message: string, type?: string): void;
    error(message: string|Error, type?: string): void;
    warning(message: string, type?: string): void;
}

class LoggerError extends Error {
    public tracert: string[];

    constructor(err: Error|undefined = undefined) {
        super();
        if(err) this.message = err.message;

        this.tracert = [];
        let stack: string[] = [];
        if(this.stack) {
            if(err && err.stack) {
                const atArray = err.stack.split('at ');
                atArray.shift();
                stack = atArray.map(item => item.trim());
            }
            else {
                const func = (this.stack.split('at '))[3];
                stack.push(func);
            }
        }
        this.tracert = stack;
    }
}

class Logger implements ILogger {
    protected ip: string|null;
    protected path: string|null;
    protected maxLevel: string|null;

    constructor() {
        this.ip = null;
        this.path = null;
        this.maxLevel = null;
    }

    configure(config: ILoggerConfig): (req: Request, res: Response, next: NextFunction) => void {
        this.maxLevel = config.level;
        return (req: Request, res: Response, next: NextFunction) => {
            this.ip = req.clientIp || null;
            this.path = req.originalUrl || null;
            next();
        };
    }

    protected validateLevel(level: 'INFO'|'WARNING'|'ERROR') {
        switch (this.maxLevel) {
            case 'INFO':
                return (level === 'INFO');
            case 'WARNING':
                return (level === 'INFO' || level === 'WARNING');
            case 'ERROR':
                return (level === 'INFO' || level === 'WARNING' || level === 'ERROR');
            default:
                return false;
        }
    }

    log(level: string, message: string, info: any): void {
        throw new Error("Method not implemented.");
    }
    info(message: string, info?: any): void {
        throw new Error("Method not implemented.");
    }
    error(message: string | Error, info?: any): void {
        throw new Error("Method not implemented.");
    }
    warning(message: string, info?: any): void {
        throw new Error("Method not implemented.");
    }

}

class ConsoleLogger extends Logger {
    private lastMessage: Date|null;
    private formatDate: Intl.DateTimeFormat;
    private color_info: string;
    private color_error: string;
    private color_warning: string;

    constructor() {
        super();
        this.lastMessage = null;
        this.formatDate = new Intl.DateTimeFormat('es', { year: 'numeric', month: 'short', day: '2-digit' });
        this.color_info = '\x1b[40m';
        this.color_error = '\x1b[41m';
        this.color_warning = '\x1b[43m';
    }

    private getTime() {
        this.lastMessage = new Date();
        return this.formatDate.format(this.lastMessage);
    }

    /**
     * 
     * @param {
     *  formatDate: Intl.DateTimeFormat,
     *  color: {
     *    info: string,
     *    error: string,
     *    warning: string
     *  }
     * } config
     */
    init(config: { formatDate?: Intl.DateTimeFormat, color?: { info: string, error: string, warning: string } }): void {
        if(config.formatDate) this.formatDate = config.formatDate;
        if(config.color) {
            this.color_info = config.color.info;
            this.color_error = config.color.error;
            this.color_warning = config.color.warning;
        }
    }

    log(level: string, message: string|Error, color: string = '\x1b[40m'): void {
        const e = (message instanceof Error) ? new LoggerError(message) : new LoggerError();
        const log = {
            level,
            message: (typeof message == 'string') ? message : e.message,
            timestamp: this.getTime(),
            tracert: e.tracert
        };
        const json = JSON.stringify(log, null, 4);
        if(level != 'error')
            console.log(`${color}%s\x1b[0m`, json);
        else
            console.log(`\n${color}>>>>>>>>>>>>>>>>>>>> ERROR >>>>>>>>>>>>>>>>>>>>\x1b[0m\n%s\n${color}<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\x1b[0m\n`, json);
    }

    info(message: string, type?: string): void {
        if(this.validateLevel('INFO'))
            this.log('info', message, this.color_info);
    }
    error(message: string|Error, type?: string): void {
        if(this.validateLevel('ERROR'))
            this.log('error', message, this.color_error);
    }
    warning(message: string, type?: string): void {
        if(this.validateLevel('WARNING'))
            this.log('warning', message, this.color_warning);
    }
}

class FileLogger extends Logger {
    lastMessage: Date|null;
    formatDate: Intl.DateTimeFormat;
    dirPath: string;

    constructor() {
        super();
        this.lastMessage = null;
        this.formatDate = new Intl.DateTimeFormat('es', { year: 'numeric', month: 'short', day: '2-digit' });
        this.dirPath = './log';
    }

    private getTime() {
        this.lastMessage = new Date();
        return this.formatDate.format(this.lastMessage);
    }

    /**
     * 
     * @param {
     *  formatDate: Intl.DateTimeFormat,
     *  dirPath: string
     * } config
     */
    init(config: { formatDate: Intl.DateTimeFormat, dirPath: string }): void {
        this.formatDate = config.formatDate;
        this.dirPath = config.dirPath;
    }

    log(level: string, message: string, type?: string): void {
        const file = path.resolve(this.dirPath, `${level}.log`);
        const msg = `${this.getTime()} [${level}][${type}]: ${message}`;
        fs.appendFileSync(file, msg);
    }

    info(message: string, type?: string): void {
        if(this.validateLevel('INFO'))
            this.log('info', message, type);
    }
    error(message: string, type?: string): void {
        if(this.validateLevel('ERROR'))
            this.log('error', message, type);
    }
    warning(message: string, type?: string): void {
        if(this.validateLevel('WARNING'))
            this.log('warning', message, type);
    }
}

class DataBaseLogger extends Logger {
    constructor() {
        super();
    }

    log(level: string, message: string, type?: string): void {
        Log.create({
            level,
            message,
            type: type,
            ip: this.ip,
            path: this.path
        });
    }

    info(message: string, type?: string): void {
        if(this.validateLevel('INFO'))
            this.log('INFORMATION', message, type);
    }
    error(message: string, type?: string): void {
        if(this.validateLevel('ERROR'))
            this.log('ERROR', message, type);
    }
    warning(message: string, type?: string): void {
        if(this.validateLevel('WARNING'))
            this.log('WARNING', message, type);
    }
}

enum TypeLogger {
    CONSOLE,
    FILE,
    DATA_BASE
};

class SimpleLog {
    private static instance: Logger;

    constructor() {}

    public static log(type: TypeLogger): Logger {
        if(! SimpleLog.instance) {
            switch (type) {
                case TypeLogger.CONSOLE:
                    SimpleLog.instance = new ConsoleLogger();
                    break;
                case TypeLogger.FILE:
                    SimpleLog.instance = new FileLogger();
                    break;
                case TypeLogger.DATA_BASE:
                    SimpleLog.instance = new DataBaseLogger();
                    break;
            }
            
        }
        return SimpleLog.instance;
    }
}

export {
    Logger,
    ConsoleLogger,
    FileLogger,
    DataBaseLogger,
    TypeLogger
};

export default function(type: TypeLogger = TypeLogger.CONSOLE) {
    return SimpleLog.log(type);
};
