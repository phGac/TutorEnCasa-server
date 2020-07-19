"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeLogger = exports.DataBaseLogger = exports.FileLogger = exports.ConsoleLogger = exports.Logger = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const log_model_1 = __importDefault(require("../db/models/log.model"));
class LoggerError extends Error {
    constructor(err) {
        super();
        this.tracert = [];
        let stack = [];
        if (err instanceof Error) {
            this.message = err.message;
            if (err.stack) {
                const atArray = err.stack.split('at ');
                atArray.shift();
                stack = atArray.map(item => item.trim());
            }
        }
        else if (this.stack) {
            this.message = err;
            const func = (this.stack.split('at '))[3];
            stack.push(func);
        }
        this.tracert = stack;
    }
}
class Logger {
    constructor() {
        this.ip = null;
        this.path = null;
        this.maxLevel = null;
    }
    configure(config) {
        this.maxLevel = config.level;
        return (req, res, next) => {
            this.ip = req.clientIp || null;
            this.path = req.originalUrl || null;
            next();
        };
    }
    validateLevel(level) {
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
}
exports.Logger = Logger;
class ConsoleLogger extends Logger {
    constructor() {
        super();
        this.lastMessage = null;
        this.formatDate = new Intl.DateTimeFormat('es-CL', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'America/Santiago'
        });
        this.color_info = '\x1b[40m';
        this.color_error = '\x1b[41m';
        this.color_warning = '\x1b[43m';
    }
    getTime() {
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
    init(config) {
        if (config.formatDate)
            this.formatDate = config.formatDate;
        if (config.color) {
            this.color_info = config.color.info;
            this.color_error = config.color.error;
            this.color_warning = config.color.warning;
        }
    }
    log(level, message, color = '\x1b[40m') {
        const e = new LoggerError(message);
        const log = {
            level,
            message: e.message,
            timestamp: this.getTime(),
            tracert: e.tracert
        };
        const json = JSON.stringify(log, null, 4);
        if (level != 'ERROR')
            console.log(`${color}%s\x1b[0m`, json);
        else
            console.log(`\n${color}>>>>>>>>>>>>>>>>>>>> ERROR >>>>>>>>>>>>>>>>>>>>\x1b[0m\n%s\n${color}<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\x1b[0m\n`, json);
    }
    info(message, type) {
        if (this.validateLevel('INFO'))
            this.log('info', message, this.color_info);
    }
    error(message, type) {
        if (this.validateLevel('ERROR'))
            this.log('error', message, this.color_error);
    }
    warning(message, type) {
        if (this.validateLevel('WARNING'))
            this.log('warning', message, this.color_warning);
    }
}
exports.ConsoleLogger = ConsoleLogger;
class FileLogger extends Logger {
    constructor() {
        super();
        this.lastMessage = null;
        this.formatDate = new Intl.DateTimeFormat('es', { year: 'numeric', month: 'short', day: '2-digit' });
        this.dirPath = './log';
    }
    getTime() {
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
    init(config) {
        this.formatDate = config.formatDate;
        this.dirPath = config.dirPath;
    }
    log(level, message, type) {
        const file = path_1.default.resolve(this.dirPath, `${level}.log`);
        const msg = `${this.getTime()} [${level}][${type}]: ${message}`;
        fs_1.default.appendFileSync(file, msg);
    }
    info(message, type) {
        if (this.validateLevel('INFO'))
            this.log('info', message, type);
    }
    error(message, type) {
        if (this.validateLevel('ERROR'))
            this.log('error', message, type);
    }
    warning(message, type) {
        if (this.validateLevel('WARNING'))
            this.log('warning', message, type);
    }
}
exports.FileLogger = FileLogger;
class DataBaseLogger extends Logger {
    constructor() {
        super();
    }
    log(level, message, type) {
        const e = new LoggerError(message);
        const trace = (e.tracert.length > 0) ? e.tracert.join('\n') : null;
        log_model_1.default.create({
            level,
            message: e.message,
            type,
            ip: this.ip,
            path: this.path,
            trace
        });
    }
    info(message, type) {
        if (this.validateLevel('INFO'))
            this.log('INFORMATION', message, type);
    }
    error(message, type) {
        if (this.validateLevel('ERROR'))
            this.log('ERROR', message, type);
    }
    warning(message, type) {
        if (this.validateLevel('WARNING'))
            this.log('WARNING', message, type);
    }
}
exports.DataBaseLogger = DataBaseLogger;
var TypeLogger;
(function (TypeLogger) {
    TypeLogger[TypeLogger["CONSOLE"] = 0] = "CONSOLE";
    TypeLogger[TypeLogger["FILE"] = 1] = "FILE";
    TypeLogger[TypeLogger["DATA_BASE"] = 2] = "DATA_BASE";
})(TypeLogger || (TypeLogger = {}));
exports.TypeLogger = TypeLogger;
;
class SimpleLog {
    constructor() { }
    static log(type) {
        if (!SimpleLog.instance) {
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
function default_1(type = TypeLogger.CONSOLE) {
    return SimpleLog.log(type);
}
exports.default = default_1;
;
