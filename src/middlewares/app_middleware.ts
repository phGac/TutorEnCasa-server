import { Request, Response, NextFunction } from "express";
import logger from "../util/logger";
import { requestMessage } from "../config/messages";

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    if(error) {
        if(! error.custom) {
            error = error.error || error;
            if(error instanceof Error)
                error = error.message;
            
            logger().error(error.error || error);
            res.status(400).json({ status: 'failed', error: requestMessage["error.unknow"] });
        }
        else {
            res.status(400).json({ status: 'failed', error: error.error });
        }
    }
    else {
        next();
    }
}

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
    const ip = req.clientIp;
    const path = req.originalUrl;
    logger().warning(`Ruta no encontrada [${ip}]: ${path}`, 'HTTP:404:NotFound');
    res.status(404).json({ status: 'failed', error: "ruta no encontrada" });
}