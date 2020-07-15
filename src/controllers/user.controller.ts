import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
// @ts-ignore
import validatorDni from 'verificador-rut';

import UserService from '../services/user.service';
import { registerMessage, requestMessage } from '../config/messages';
import User, { UserStatus } from '../db/models/user.model';
import EmailService, { Email } from '../services/email.service';
import { userToShowClient } from '../util/to_show_client.util';
import { validateRut, hasNumberYears } from '../util/validator.util';

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

    static update(req: Request, res: Response, next: NextFunction) {
        next();
    }

    static destroy(req: Request, res: Response, next: NextFunction) {
        next();
    }

    static validate(req: Request, res: Response, next: NextFunction) {
        res.locals.dni = req.params.dni;
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
                else if(hasNumberYears(birthdate, 10)) {
                    next({ error: new Error('Lo lamentamos, pero no tienes la edad mínima permitida para crear una cuenta :c'), custom: true });
                    return;
                }
                const data = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    birthdate: birthdate,
                    status: UserStatus.ACTIVE
                };
                UserService.update(data, { dni: req.body.dni })
                    .then((info) => {
                        if(info.count == 1) {
                            res.locals.user = info.users[0];
                            res.locals.auth = true;
                            res.redirect(`/public/registro?paso=2&run=${info.users[0].dni}`);
                        }
                        else {
                            next({ error: new Error(registerMessage["step.two.user.notFound"]), custom: true });
                        }
                    })
                    .catch((err) => {
                        next(err);
                    });
                break;
            default:
                next({ error: new Error(registerMessage["step.out"]), custom: false });
                break;
        }
        
    }

    static update(req: Request, res: Response) {}

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
                res.json({ status: 'success' });
            });
    }
}

export {
    UserValidatorController
}

export default UserController;