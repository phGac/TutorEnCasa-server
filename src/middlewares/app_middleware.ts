import { Request, Response, NextFunction } from "express";
import logger from "../util/logger";
import { requestMessage } from "../config/messages";

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    if(error) {
        if(! error.custom) {
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
    logger().warning(`Ruta no encontrada [${ip}]: ${path}`, { type: 'NotFound', ip, path });
    res.status(404).json({ status: 'failed', error: "ruta no encontrada" });
}