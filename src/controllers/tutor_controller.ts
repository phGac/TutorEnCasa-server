import { Request, Response, NextFunction } from "express";

import { findTutor } from "../util/find";
import { requestMessage, tutorMessage } from "../config/messages";
import { Theme, TutorTheme, Tutor, User } from '../db/models';
import { TutorStatus } from "../db/models/tutor.model";
import FileService from "../services/file.service";
import { FindOptions } from "sequelize/types";
import validator from "validator";

class TutorValidatorController {
    static show(req: Request, res: Response, next: NextFunction) {
        if(! validator.isInt(req.params.id))
            return next({ error: 'Tipo de valor inválido', custom: true });
        res.locals.id = parseInt(req.params.id);
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
    static newRequest(req: Request, res: Response, next: NextFunction) {
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

    static request(req: Request, res: Response, next: NextFunction) {
        next();
    }

    static validate(req: Request, res: Response, next: NextFunction) {
        res.locals.id = req.params.id;
        next();
    }
}

class TutorController {
    static show(req: Request, res: Response, next: NextFunction) {
        const { id } = res.locals;
        const options: FindOptions = {
            where: { id },
            include: [
                { association: 'themes' },
                { association: 'certificates' }
            ]
        };
        Tutor.findOne(options)
            .then((tutor) => {
                if(! tutor) return next({ error: 'Tutor no encontrado', custom: true });
                res.json({
                    status: 'success',
                    tutor
                });
            })
            .catch((err) => {
                next({ error: err, custom: false });
            });
    }
    static find(req: Request, res: Response, next: NextFunction) {
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
        const options: FindOptions = {
            where: {
                status: TutorStatus.UNVALIDATED
            },
            include: [
                { association: 'user' },
                { 
                    association: 'certificates',
                    limit: 1,
                    order: [ [ 'createdAt', 'DESC' ]]
                }
            ]
        };
        Tutor.findAll(options)
            .then((tutors) => {
                res.json({ 
                    status: 'success',
                    tutors 
                });
            })
            .catch((err) => {
                next({ error: err, custom: false });
            });
    }
    static newRequest(req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        const { id } = req.user;
        const { file, type } = res.locals;

        // @ts-ignore
        FileService.upload(file, req.user)
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

    static validate(req: Request, res: Response, next: NextFunction) {
        const { id } = res.locals;
        Tutor.update({
                    status: TutorStatus.ACTIVE
                }, {
                where: {
                    id,
                    status: TutorStatus.UNVALIDATED
                }
            })
            .then((info) => {
                if(info[0] == 0) {
                    next({ error: 'Tutor ya validado', custom: true });
                    return;
                }
                res.json({ status: 'success' });
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