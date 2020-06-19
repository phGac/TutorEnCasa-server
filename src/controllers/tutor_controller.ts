import { Request, Response, NextFunction } from "express";
import { findTutor } from "../util/find";
import { requestMessage } from "../config/messages";
import Theme from "../db/models/theme";
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

    static async addTheme(req: Request, res: Response, next: NextFunction) {
        if(! req.body.id_theme && (! req.body.name)) {
            next({ error: requestMessage["params.missing"], custom: true });
            return;
        }
        
        // @ts-ignore
        const id_tutor = req.user.id_tutor;

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
            next({ error: e, custom: false });
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
            next({ error: e, custom: false });
        });
    }
}

export default TutorController;