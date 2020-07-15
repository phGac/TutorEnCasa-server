import { Request, Response, NextFunction } from "express";
import { Tutor } from "../db/models";
import { FindOptions } from "sequelize/types";
import { TutorStatus } from "../db/models/tutor.model";
import { requestMessage } from "../config/messages";
import FileService from "../services/file.service";
import validator from "validator";
import Log from "../db/models/log.model";
import EmailService, { Email } from "../services/email.service";
import logger from "../util/logger.util";

class AdministratorValidatorController {
    static create(req: Request, res: Response, next: NextFunction) {
        next();
    }
    static update(req: Request, res: Response, next: NextFunction) {
        next();
    }
    static destroy(req: Request, res: Response, next: NextFunction) {
        next();
    }
    static show(req: Request, res: Response, next: NextFunction) {
        next();
    }
    static tutorUnvalidated(req: Request, res: Response, next: NextFunction) {
        res.locals.id = (req.params.id) ? req.params.id : undefined;
        next();
    }
    static tutorCertificate(req: Request, res: Response, next: NextFunction) {
        if(! req.params.id) {
            return next({ error: new Error(requestMessage["params.missing"]), custom: true });
        }
        res.locals.id = req.params.id;
        next();
    }
    static tutorValidate(req: Request, res: Response, next: NextFunction) {
        if(! req.params.id || ! validator.isInt(req.params.id) || ! req.body.status) {
            return next({ error: new Error(requestMessage["params.missing"]), custom: true });
        }

        res.locals.id = req.params.id;
        res.locals.status = req.body.status;
        next();
    }
    static logs(req: Request, res: Response, next: NextFunction) {
        if(req.query.top && typeof req.query.top == 'string') {
            if(! validator.isInt(req.query.top))
                return next({ error: new Error(requestMessage["params.missing"]), custom: true });
            else
                res.locals.top = parseInt(req.query.top);
        }
        else {
            res.locals.top = 50;
        }
        next();
    }
    static reports(req: Request, res: Response, next: NextFunction) {
        next();
    }
}

class AdministratorController {
    static tutorUnvalidated(req: Request, res: Response, next: NextFunction) {
        const { id } = res.locals;
        const options: FindOptions = {
            include: [
                { 
                    association: 'user',
                    attributes: [ 'firstname', 'lastname', 'email', 'birthdate' ],
                    required: true
                },
                { association: 'themes' },
            ]
        };
        if(! id) {
            options.where = { status: TutorStatus.UNVALIDATED };
        }
        else {
            options.where = { 
                status: TutorStatus.UNVALIDATED,
                id
            };
            options.include?.push({
                association: 'certificates',
                order: [ [ 'createdAt', 'DESC' ] ]
            });
        }

        Tutor.findAll(options)
                .then((tutors) => {
                    if(! id) {
                        res.json({
                            status: 'success',
                            tutors
                        });
                    }
                    else {
                        res.json({
                            status: 'success',
                            tutor: (tutors.length > 0) ? tutors[0] : null
                        });
                    }
                })
                .catch((e) => {
                    next({ error: e, custom: false });
                });
    }

    static tutorCertificate(req: Request, res: Response, next: NextFunction) {
        const { id } = res.locals;
        const options: FindOptions = {
            where: { id, status: [ TutorStatus.UNVALIDATED, TutorStatus.REJECTED ] },
            attributes: [],
            include: [
                {
                    association: 'certificates',
                    order: [ [ 'createdAt', 'DESC' ] ],
                    required: true
                }
            ]
        };
        Tutor.findOne(options)
            .then((tutor) => {
                if(tutor) {
                    const stream = FileService.download(tutor.certificates[0].key);
                    stream.pipe(res);
                }
                else {
                    next({ error: new Error('Usuario no encontrado'), custom: true });
                }
            })
            .catch((e) => {
                next({ error: e, custom: false });
            });
    }

    static tutorValidate(req: Request, res: Response, next: NextFunction) {
        const { id, status } = res.locals;
        
        const options: FindOptions = {
            where: { 
                id, 
                status: [ TutorStatus.UNVALIDATED, TutorStatus.REJECTED ] 
            },
            include: [
                {
                    association: 'user',
                    required: true
                }
            ]
        };
        Tutor.findOne(options)
            .then((tutor) => {
                if(tutor) {
                    if(status == 1)
                        tutor.update({ status: TutorStatus.ACTIVE });
                    else
                        tutor.update({ status: TutorStatus.REJECTED });
                    const params = {
                        status: status == 1 ? 'Aprobado' : 'Rechazado',
                        // @ts-ignore
                        firstname: tutor.user.firstname,
                        // @ts-ignore
                        lastname: tutor.user.lastname,
                        date: tutor.createdAt.toDateString()
                    };
                    res.render('templates/emails/validation-tutor', params, (err: Error, html: string) => {
                        if(err) {
                            next({ error: err, custom: false });
                            return;
                        }
                        else {
                            EmailService.sendEmail(new Email('Resultado de solicitud - Tutor en Casa', html))
                                .catch((e) => {
                                    next({ error: e, custom: false });
                                });
                            res.json({ status: 'success' });
                        }
                    });
                }
                else {
                    next({ error: new Error('Tutor no existe o ya está validado'), custom: true });
                }
            })
            .catch((e) => {
                next({ error: e, custom: false });
            });
    }
    static create(req: Request, res: Response, next: NextFunction) {}
    static update(req: Request, res: Response, next: NextFunction) {}
    static destroy(req: Request, res: Response, next: NextFunction) {}
    static show(req: Request, res: Response, next: NextFunction) {}
    static logs(req: Request, res: Response, next: NextFunction) {
        const { top } = res.locals;

        Log.findAll({ limit: top, order: [[ 'createdAt', 'DESC' ]] })
            .then((logs) => {
                res.json({
                    status: 'success',
                    logs
                });
            })
            .catch((e) => {
                next({ error: e, custom: false });
            });
    }
    static reports(req: Request, res: Response, next: NextFunction) {
        //
    }
}

export {
    AdministratorValidatorController
}

export default AdministratorController;