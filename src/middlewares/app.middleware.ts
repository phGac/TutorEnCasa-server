import { Request, Response, NextFunction } from "express";
import logger from "../util/logger.util";
import { requestMessage } from "../config/messages";

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    if(error) {
        let message = null;
        if(! error.custom) {
            error = error.error || error;
            logger().error(error);
            message = requestMessage["error.unknow"];
        }
        else {
            error = error.error || error;
            if(error instanceof Error)
                message = error.message;
            else
                message = error;
        }

        res.status(400).json({ status: 'failed', error: message });
    }
    else {
        next();
    }
}

export function notFoundHandler(req: Request, res: Response) {
    const ip = req.clientIp;
    const path = req.originalUrl;
    logger().warning(`Ruta no encontrada [${ip}]: ${path}`, 'HTTP:404:NotFound');
    res.status(404).json({ status: 'failed', error: "ruta no encontrada" });
}