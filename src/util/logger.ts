import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';

interface Logger {
    lastMessage: Date|null;
    formatDate: Intl.DateTimeFormat;
    init(config: any): void;
    log(level: string, message: string): void;
    info(message: string): void;
    error(message: string): void;
    warning(message: string): void;
}

class ConsoleLogger implements Logger {
    lastMessage: Date|null;
    formatDate: Intl.DateTimeFormat;

    constructor() {
        this.lastMessage = null;
        this.formatDate = new Intl.DateTimeFormat('es', { year: 'numeric', month: 'short', day: '2-digit' });
    }

    private getTime() {
        this.lastMessage = new Date();
        return this.formatDate.format(this.lastMessage);
    }

    /**
     * 
     * @param {
     *  formatDate: Intl.DateTimeFormat
     * } config
     */
    init(config: { formatDate: Intl.DateTimeFormat }): void {
        this.formatDate = config.formatDate;
    }

    log(level: string, message: string): void {
        console.log(`${this.getTime()} [${level}]: ${message}`);
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
