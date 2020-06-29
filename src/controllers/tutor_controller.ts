import { Request, Response, NextFunction } from "express";
import path from 'path';

import { findTutor } from "../util/find";
import { requestMessage, tutorMessage } from "../config/messages";
import Theme from "../db/models/theme";
import TutorTheme from "../db/models/tutortheme";
import Tutor, { TutorStatus } from "../db/models/tutor";
import User from "../db/models/user";
import fileUpload from "express-fileupload";
import { CreateOptions } from "sequelize/types";
import { file_upload } from "../services/file_service";

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
    static async request(req: Request, res: Response, next: NextFunction) {
        if(! req.files || ! req.files.file || ! req.body.type) {
            next({ error: requestMessage["params.missing"], custom: true });
            return;
        }

        if(Array.isArray(req.files.file) || req.files.file.mimetype != 'application/pdf') {
            next({ error: 'Formato de archivo no soportado', custom: true });
            return;
        }

        // @ts-ignore
        const { id } = req.user;

        const options = { 
            where: { id }, 
            include: [ { association: 'role_tutor' } ]
        };
        User.findOne(options)
            .then((user) => {
                // @ts-ignore
                if(! user || user.role_tutor)
                    return next({ error: 'Ya has solicitado ser tutor', custom: true });

                res.locals.type = req.body.type;
                res.locals.file = req.files?.file;
                next();
            })
            .catch((e) => {
                next({ error: e, custom: false });
            });
        
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

    static request(req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        const { id } = req.user;
        const { file, type } = res.locals;

        // @ts-ignore
        file_upload(file, req.user)
            .then((file) => {       
                Tutor.create({
                    id_user: id,
                    status: TutorStatus.UNVALIDATED,
                    certificates: [ 
                        { id_file: file.id, type }
                    ]
                }, {
                    include: [ { association: 'certificates' } ]
                })
                .then((tutor) => {
                    res.json({ status: 'success', message: tutorMessage["request.success"] });
                })
                .catch((e) => {
                    next({ error: e, custom: false });
                });
            })
            .catch((e) => next(e));
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