import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
// @ts-ignore
import validatorDni from 'verificador-rut';

import UserService from '../services/user.service';
import { registerMessage, requestMessage } from '../config/messages';
import User, { UserStatus } from '../db/models/user.model';
import EmailService, { Email } from '../services/email.service';
import { userToShowClient } from '../util/to_show_client.util';
import { validateRut, hasMinNumberYears } from '../util/validator.util';
import { FindOptions } from 'sequelize/types';
import { HistoryPassword } from '../db/models';
import loggerUtil from '../util/logger.util';

class UserValidatorController {
    static show(req: Request, res: Response, next: NextFunction) {
        next();
    }
    static create(req: Request, res: Response, next: NextFunction) {
        if(! req.params.step || ! req.body.dni) {
            next({ error: new Error(requestMessage["params.missing"]), custom: true });
            return;
        }

        switch (req.params.step) {
            case '1':
                if(! req.body.email || ! req.body.password) {
                    next({ error: new Error(requestMessage["params.missing"]), custom: true });
                    return;
                }
            case '2':
                if(! req.body.firstname || ! req.body.lastname || ! req.body.birthdate) {
                    next({ error: new Error(requestMessage["params.missing"]), custom: true });
                    return;
                }
            default:
                next({ error: new Error(registerMessage["step.out"]), custom: true });
                break;
        }

        if(validateRut(req.body.dni)) {
            next({ error: new Error('El rut ingresado es inválido'), custom: true });
            return;
        }

        next();
    }

    static destroy(req: Request, res: Response, next: NextFunction) {
        next();
    }

    static validate(req: Request, res: Response, next: NextFunction) {
        res.locals.dni = req.params.dni;
        next();
    }

    static update(req: Request, res: Response, next: NextFunction) {
        next();
    }

    static profile(req: Request, res: Response, next: NextFunction) {
        if((! req.body.password || ! req.body.actual_password) && ! req.body.email) {
            return next({ error: new Error(requestMessage["params.missing"]), custom: true });
        }
        res.locals.email = req.body.email ? req.body.email : undefined;
        res.locals.password = req.body.password ? req.body.password : undefined;
        res.locals.actual_password = req.body.actual_password ? req.body.actual_password : undefined;
        next();
    }
}

class UserController {
    static show(req: Request, res: Response, next: NextFunction) {
        if(! req.params.id) {
            next({ error: new Error(requestMessage["params.missing"]), custom: true });
            return;
        }
        const { id } = req.params;
        const options = {
            where: { id },
            include: [
                { association: 'role_tutor' },
                { association: 'role_administrator' },
            ]
        };
        User.findOne(options)
            .then((user) => {
                const toShow = (user) ? userToShowClient(user) : null;
                res.json({ 
                    status: 'success', 
                    user: toShow
                });
            })
            .catch((err) => {
                next({ error: err, custom: false });
            });
    }

    static create(req: Request, res: Response, next: NextFunction) {
        let dniDv = null;
        switch (req.params.step) {
            case '1':
                const { email, password, dni } = req.body;
                dniDv = validatorDni(dni);
                if (! validator.isEmail(email)) {
                    next({ error: new Error(registerMessage["user.email.invalid"]), custom: true });
                    return;
                }
                if (! validatorDni(dni, dniDv)) {
                    next({ error: new Error(registerMessage["user.dni.invalid"]), custom: true });
                    return;
                }
                UserService.create({ email, password, dni })
                    .then((user) => {
                        res.render(
                            'templates/emails/validation-user', 
                            { url: `https://tutorencasa.tk/api/user/${dni}/validate` }, 
                            (err: Error, html: string) => {
                                if(err) {
                                    next({ error: err, custom: false });
                                    return;
                                }
                                else {
                                    EmailService.sendEmail(new Email('Valida tu cuenta! - Tutor en Casa', html))
                                        .then((messageId) => {
                                            res.json({ status: 'success', message: registerMessage["user.status.ok"] });
                                        })
                                        .catch((e) => {
                                            next({ error: e, custom: false });
                                        });
                                }
                        });
                    })
                    .catch((err) => {
                        next(err);
                    });
                break;
            case '2':
                dniDv = validatorDni(req.body.dni);
                if (! validatorDni(req.body.dni, dniDv)) {
                    next({ error: new Error(registerMessage["user.dni.invalid"]), custom: true });
                    return;
                }
                const birthdate = validator.toDate(req.body.birthdate)
                if(! birthdate) {
                    next({ error: new Error(registerMessage["user.birthday.invalid"]), custom: true });
                    return;
                }
                else if(! hasMinNumberYears(birthdate, 10)) {
                    next({ error: new Error('Lo lamentamos, pero no tienes la edad mínima permitida para crear una cuenta :c'), custom: true });
                    return;
                }
                User.findOne({ where: { dni: req.body.dni } })
                    .then((user) => {
                        if(! user) return next({ error: new Error('Usuario no encontrado'), custom: true });
                        else if(user.firstname) return next({ error: new Error('El usuario ya ha finalizado su registro'), custom: true });
                        
                        const data = {
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            birthdate: birthdate,
                            status: UserStatus.ACTIVE
                        };
                        UserService.update(data, { dni: req.body.dni })
                            .then((info) => {
                                if(info.count > 0) {
                                    res.json({ status: 'success' });
                                }
                                else {
                                    next({ error: new Error(registerMessage["step.two.user.notFound"]), custom: true });
                                }
                            })
                            .catch((err) => {
                                next(err);
                            });
                    })
                    .catch((e) => {
                        next({ error: e, custom: false });
                    });
                break;
            default:
                next({ error: new Error(registerMessage["step.out"]), custom: false });
                break;
        }
        
    }

    static update(req: Request, res: Response, next: NextFunction) {

    }

    static profile(req: Request, res: Response, next: NextFunction) {
        const { email, password, actual_password } = res.locals;
        // @ts-ignore
        const { id } = req.user;
        if(! email) {
            const options: FindOptions = {
                where: { id },
                include: [{ 
                    association: 'passwords',
                    order: [[ 'createdAt', 'DESC' ]],
                    limit: 1
                }]
            };
            User.findOne(options)
                .then((user) => {
                    if(! user) return next({ error: new Error('Usuario no encontrado'), custom: true });
                    user.isValidPassword(actual_password)
                        .then((valid) => {
                            if(! valid) return next({ error: new Error('La contraseña es inválida'), custom: true });
                            HistoryPassword.create({
                                id_user: id,
                                password
                            })
                            .catch((e) => loggerUtil().error(e));
                            res.json({ status: 'success' });
                        })
                        .catch((e) => {
                            next(e);
                        });
                })
                .catch((e) => {
                    next({ error: e, custom: false });
                });
        }
        else {
            // @ts-ignore
            if(email == req.user.email) {
                return next({ error: new Error('El correo debe ser diferente al actual') });
            } 
            User.findOne({ where: { email } })
                .then((user) => {
                    if(user) return next({ error: new Error('El correo ya está en uso'), custom: true });
                    User.update({ email }, { where: { id } })
                        .catch((e) => {
                            loggerUtil().error(e);
                        });
                    res.json({ status: 'success' });
                });
        }
    }

    static destroy(req: Request, res: Response) {}

    static validate(req: Request, res: Response, next: NextFunction) {
        const { dni } = res.locals;
        User.update({
                    status: UserStatus.ACTIVE
                }, {
                where: {
                    dni,
                    status: UserStatus.UNVALIDATED
                }
            })
            .then((info) => {
                if(info[0] == 0) {
                    next({ error: new Error('Usuario ya validado'), custom: true });
                    return;
                }
                res.redirect(`/public/registro?paso=2&run=${dni}`);
            })
            .catch((e) => {
                next({ error: e, custom: false });
            });
    }
}

export {
    UserValidatorController
}

export default UserController;