"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeLogger = exports.DataBaseLogger = exports.FileLogger = exports.ConsoleLogger = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("../db/models/logger"));
class LoggerError extends Error {
    constructor(err = undefined) {
        super();
        if (err)
            this.message = err.message;
        this.tracert = [];
        let stack = [];
        if (this.stack) {
            if (err && err.stack) {
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
class ConsoleLogger {
    constructor() {
        this.lastMessage = null;
        this.formatDate = new Intl.DateTimeFormat('es', { year: 'numeric', month: 'short', day: '2-digit' });
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
        const e = (message instanceof Error) ? new LoggerError(message) : new LoggerError();
        const log = {
            level,
            message: (typeof message == 'string') ? message : e.message,
            timestamp: this.getTime(),
            tracert: e.tracert
        };
        const json = JSON.stringify(log, null, 4);
        if (level != 'error')
            console.log(`${color}%s\x1b[0m`, json);
        else
            console.log(`\n${color}>>>>>>>>>>>>>>>>>>>> ERROR >>>>>>>>>>>>>>>>>>>>\x1b[0m\n%s\n${color}<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<\x1b[0m\n`, json);
    }
    info(message, type) {
        this.log('info', message, this.color_info);
    }
    error(message, type) {
        this.log('error', message, this.color_error);
    }
    warning(message, type) {
        this.log('warning', message, this.color_warning);
    }
}
exports.ConsoleLogger = ConsoleLogger;
class FileLogger {
    constructor() {
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
        this.log('info', message, type);
    }
    error(message, type) {
        this.log('error', message, type);
    }
    warning(message, type) {
        this.log('warning', message, type);
    }
}
exports.FileLogger = FileLogger;
class DataBaseLogger {
    constructor() { }
    init(config) { }
    log(level, message, info) {
        logger_1.default.create({
            level,
            message,
            type: info.type,
            ip: info.ip,
            path: info.path
        });
    }
    info(message, info) {
        this.log('INFORMATION', message, {
            type: info.type,
            ip: info.ip,
            path: info.path
        });
    }
    error(message, info) {
        this.log('ERROR', message, {
            type: info.type,
            ip: info.ip,
            path: info.path
        });
    }
    warning(message, info) {
        this.log('WARNING', message, {
            type: info.type,
            ip: info.ip,
            path: info.path
        });
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
