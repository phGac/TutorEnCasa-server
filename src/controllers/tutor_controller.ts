import { Request, Response } from "express";
import { findTutor } from "../util/find";

class TutorController {
    static find(req: Request, res: Response) {
        findTutor({
            where: {
                //
            },
            include: {
                priceses: true
            }
        });
    }
}

export default TutorController;