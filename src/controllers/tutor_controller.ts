import { Request, Response, NextFunction } from "express";
import path from 'path';

import { findTutor } from "../util/find";
import { requestMessage, tutorMessage } from "../config/messages";
import Theme from "../db/models/theme";
import TutorTheme from "../db/models/tutortheme";
import Tutor, { TutorStatus } from "../db/models/tutor";

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

    static async request(req: Request, res: Response, next: NextFunction) {
        if(! req.body.themes || ! req.files || ! req.files.file) {
            next({ error: requestMessage["params.missing"], custom: true });
            return;
        }

        // @ts-ignore
        const { id } = req.user;
        const { themes } = req.body;
        const file = req.files.file;

        Tutor.create({
            id_user: id,
            status: TutorStatus.UNVALIDATED
        }).then((tutor) => {
            themes.forEach((name: string) => {
                Theme.findOrCreate({
                    where: { name },
                    defaults: { name }
                }).then((info) => {
                    if(info[0]) {
                        TutorTheme.create({
                            id_theme: info[0].id,
                            id_tutor: tutor.id
                        });
                    }
                });
            });
            res.json({ status: 'success?' });
            if(! Array.isArray(file)) {
                const dir = process.env.DIR_FILE_UPLOADS || path.resolve(__dirname, '..', '..', 'uploaded');
                file.mv(dir, (err) => {
                    if(err) {
                        next({ error: err, custom: false });
                    }
                    else {
                        res.json({ status: 'success', message: tutorMessage["request.success"] });
                    }
                });
                return;
            }
        })
        .catch((e) => {
            next({ error: e, custom: false });
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