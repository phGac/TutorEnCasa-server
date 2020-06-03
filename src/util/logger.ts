import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';

interface Logger {
    lastMessage: Date|null;
    formatDate: Intl.DateTimeFormat;
    init(config: any): void;
    log(level: string, message: string): void;
    info(message: string): void;
    error(message: string|Error): void;
    warning(message: string): void;
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

class ConsoleLogger implements Logger {
    lastMessage: Date|null;
    formatDate: Intl.DateTimeFormat;
    private color_info: string;
    private color_error: string;
    private color_warning: string;

    constructor() {
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

    info(message: string): void {
        this.log('info', message, this.color_info);
    }
    error(message: string|Error): void {
        this.log('error', message, this.color_error);
    }
    warning(message: string): void {
        this.log('warning', message, this.color_warning);
    }
}

class FileLogger implements Logger {
    lastMessage: Date|null;
    formatDate: Intl.DateTimeFormat;
    dirPath: string;

    constructor() {
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

    log(level: string, message: string): void {
        const file = path.resolve(this.dirPath, `${level}.log`);
        const msg = `${this.getTime()} [${level}]: ${message}`;
        fs.appendFileSync(file, msg);
    }

    info(message: string): void {
        this.log('info', message);
    }
    error(message: string): void {
        this.log('error', message);
    }
    warning(message: string): void {
        this.log('warning', message);
    }
}

class DataBaseLogger implements Logger {
    lastMessage: Date|null;
    formatDate: Intl.DateTimeFormat;
    private db: Sequelize|null;

    constructor() {
        this.lastMessage = null;
        this.formatDate = new Intl.DateTimeFormat('es', { year: 'numeric', month: 'short', day: '2-digit' });
        this.db = null;
    }

    private getTime() {
        this.lastMessage = new Date();
        return this.formatDate.format(this.lastMessage);
    }

    /**
     * 
     * @param {
     *  formatDate: Intl.DateTimeFormat,
     *  db: DataBase
     * } config
     */
    init(config: { formatDate: Intl.DateTimeFormat, db: Sequelize }): void {
        this.formatDate = config.formatDate;
    }

    log(level: string, message: string): void {
        console.log(`${this.getTime()} [${level}]: ${message}`);
    }

    info(message: string): void {}
    error(message: string): void {}
    warning(message: string): void {}
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
