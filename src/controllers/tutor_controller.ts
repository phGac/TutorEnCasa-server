import { Request, Response } from "express";
import { findTutor } from "../util/find";
import { requestMessage } from "../config/messages";
import Theme from "../db/models/theme";
import logger from "../util/logger";
import TutorTheme from "../db/models/tutortheme";

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

    static async addTheme(req: Request, res: Response) {
        if(! req.body.id_theme && (! req.body.name)) {
            res.status(400).json({
                status: 'failed',
                error: requestMessage["params.missing"]
            });
            return;
        }
               
        const id_tutor = req.session?.user.id_tutor;

        const name = req.body.name ? req.body.name : undefined;
        const description = req.body.description ? req.body.description : undefined;

        let id_theme = null;
        await Theme.findOrCreate({
            where: { name },
            defaults: {
                name,
                description
            }
        }).then((info) => {
            id_theme = info[0].id;
        })
        .catch((e) => {
            logger().error(e);
        });

        TutorTheme.findOrCreate({
            defaults: {
                id_tutor,
                id_theme
            },
            where: { id_tutor, id_theme }
        }).then(() => {
            res.json({ status: 'success' });
        })
        .catch((e) => {
            logger().error(e);
            res.status(400).json({
                status: 'failed',
                error: requestMessage["error.unknow"]
            });
        });
    }
}

export default TutorController;