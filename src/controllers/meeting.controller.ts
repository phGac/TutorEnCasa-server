import { Request, Response, NextFunction } from "express";
import MeetingService from "../services/meeting.service";
import { requestMessage } from "../config/messages";
import logger from "../util/logger.util";

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
            next({ error: new Error(requestMessage["params.missing"]), custom: true });
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
    static join(req: Request, res: Response, next: NextFunction) {
        if(! req.body.id) {
            next({ error: new Error(requestMessage["params.missing"]), custom: true });
            return;
        }
        const { id } = req.body;
        MeetingService.join(id)
            .then((data) => {
                res.json(data);
            })
            .catch(e => {
                next(e);
            });
    }
    static destroy(req: Request, res: Response, next: NextFunction) {
        if(! req.body.id) {
            next({ error: new Error(requestMessage["params.missing"]), custom: true });
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