import { Request, Response, NextFunction } from "express";
import MeetingService from "../services/meeting.service";
import { requestMessage } from "../config/messages";
import logger from "../util/logger";

class MeetingValidatorController {
    static show(req: Request, res: Response, next: NextFunction) {
        next();
    }
    static create(req: Request, res: Response, next: NextFunction) {
        next();
    }
    static update(req: Request, res: Response, next: NextFunction) {
        next();
    }
    static destroy(req: Request, res: Response, next: NextFunction) {
        next();
    }
}

class MeetingController {
    static create(req: Request, res: Response, next: NextFunction) {
        if(! req.body.id) {
            next({ error: requestMessage["params.missing"], custom: true });
            return;
        }
        const { id } = req.body;
        MeetingService.create(id, 'sa-east-1')
            .then(() => {
                MeetingService.join(id)
                    .then((data) => {
                        res.json(data);
                    })
                    .catch(e => {
                        next(e);
                    });
            })
            .catch((e) => {
                next(e);
            });
    }
    static join(req: Request, res: Response) {
        if(! req.body.id) {
            res.json({
                error: requestMessage["params.missing"]
            });
            return;
        }
        const { id } = req.body;
        MeetingService.join(id)
            .then((data) => {
                res.json(data);
            })
            .catch(e => {
                if(! e.custom) {
                    logger().error(e.error);
                    res.json({ error: requestMessage["error.unknow"] });
                }
                else {
                    res.json({ error: e.error });
                }
            });
    }
    static destroy(req: Request, res: Response) {
        if(! req.body.id) {
            res.json({
                satus: 'failed',
                error: requestMessage["params.missing"]
            });
            return;
        }
        const { id } = req.body;
        MeetingService.destroy(id);
    }
}

export {
    MeetingValidatorController
}

export default MeetingController;