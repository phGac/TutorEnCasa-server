import { Request, Response } from "express";
import MeetingService from "../services/meeting_service";
import { requestMessage } from "../config/messages";
import logger from "../util/logger";

class MeetingController {
    static create(req: Request, res: Response) {
        if(! req.body.id) {
            res.json({
                error: requestMessage["params.missing"]
            });
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
                        if(! e.custom) {
                            logger().error(e.error);
                            res.json({ error: requestMessage["error.unknow"] });
                        }
                        else {
                            res.json({ error: e.error });
                        }
                    });
            })
            .catch((e) => {
                if(! e.custom) {
                    logger().error(e.error);
                    res.json({ error: requestMessage["error.unknow"] });
                }
                else {
                    res.json({ error: e.error });
                }
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
                error: requestMessage["params.missing"]
            });
            return;
        }
        const { id } = req.body;
        MeetingService.destroy(id);
    }
}

export default MeetingController;