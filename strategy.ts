import { NextFunction, Response, Request } from "express";

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

class Logger {
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
}

class ConsoleLogger extends Logger implements ILogger {
    log(level: string, message: string, type?: string) {
        // ...
    }
    info(message: string, type?: string) {
        // ...
    }
    error(message: string|Error, type?: string) {
        // ...
    }
    warning(message: string, type?: string) {
        // ...
    }
}

class FileLogger extends Logger implements ILogger {
    // ...
}

class DataBaseLogger extends Logger implements ILogger {
    // ...
}