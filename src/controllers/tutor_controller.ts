import { Request, Response, NextFunction } from "express";
import path from 'path';

import { findTutor } from "../util/find";
import { requestMessage, tutorMessage } from "../config/messages";
import Theme from "../db/models/theme";
import TutorTheme from "../db/models/tutortheme";
import Tutor, { TutorStatus } from "../db/models/tutor";

class TutorValidatorController {
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
        if(! req.files || ! req.files.file) {
            next({ error: requestMessage["params.missing"], custom: true });
            return;
        }

        // @ts-ignore
        const { id, firstname, lastname } = req.user;
        //const { themes } = req.body;
        const file = req.files.file;

        Tutor.create({
            id_user: id,
            status: TutorStatus.UNVALIDATED
        }).then((tutor) => {
            if(! Array.isArray(file)) {
                const date = new Date();
                const date_filename = `${date.getFullYear()}${date.getMonth()}${date.getDay()}_${date.getHours()}${date.getMinutes()}`;
                const filename = `${date_filename}-${firstname}_${lastname}.pdf`;
                const dir = process.env.DIR_FILE_UPLOADS || path.resolve(__dirname, '..', '..', 'uploads');
                const filepath = path.resolve(dir, filename);
                file.mv(filepath, (err) => {
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

    static addThemes(req: Request, res: Response, next: NextFunction) {
        if(! req.body.themes || ! Array.isArray(req.body.themes)) {
            next({ error: requestMessage["params.missing"], custom: true });
            return;
        }
        
        // @ts-ignore
        const id_tutor = req.user.id_tutor;
        const { themes } = req.body;

        themes.forEach((data: { name: string, id_parent: string }) => {
            Theme.findOrCreate({
                where: { name: data.name },
                defaults: { 
                    name: data.name,
                    id_theme_parent: data.id_parent || 0
                }
            }).then((info) => {
                if(info[0]) {
                    TutorTheme.create({
                        id_theme: info[0].id,
                        id_tutor: id_tutor
                    });
                }
            });
        });

        res.json({ status: 'success' });
    }
}

export {
    TutorValidatorController
}

export default TutorController;