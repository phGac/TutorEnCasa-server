import { Request, Response, NextFunction } from 'express';
import logger from '../util/logger';
import UserService from '../services/user_service';
import { registerMessage, requestMessage } from '../config/messages';
import User, { UserStatus } from '../db/models/user';
import EmailService, { Email } from '../services/email_service';
import { userToShowClient } from '../util/to_show_client';

class UserController {
    static show(req: Request, res: Response, next: NextFunction) {
        if(! req.params.id) {
            next({ error: requestMessage["params.missing"], custom: true });
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
        switch (req.params.step) {
            case '1':
                if(! req.body.email || ! req.body.password || ! req.body.dni) {
                    next({ error: requestMessage["params.missing"], custom: true });
                    return;
                }
                const { email, password, dni } = req.body;
                UserService.create({ email, password, dni })
                    .then((user) => {
                        res.json({ status: 'success', message: registerMessage["user.status.ok"] });
                    })
                    .catch((err) => {
                        next(err);
                    });
                break;
            case '2':
                if(! req.body.firstname || ! req.body.lastname || ! req.body.birthdate || ! req.body.dni) {
                    next({ error: requestMessage["params.missing"], custom: false });
                    return;
                }
                const data = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    birthdate: new Date(req.body.birthdate),
                    status: UserStatus.ACTIVE
                };
                UserService.update(data, { dni: req.body.dni })
                    .then((info) => {
                        if(info.count == 1) {
                            res.locals.user = info.users[0];
                            res.locals.auth = true;
                            res.json({ status: 'success', user: info.users[0] });
                            EmailService.sendEmail(new Email('Valida tu cuenta!', `Dirigete al siguiente link para validar tu cuenta (${email}): http://link.com/ajjajka`));
                        }
                        else {
                            next({ error: registerMessage["step.two.user.notFound"], custom: true });
                        }
                    })
                    .catch((err) => {
                        next({ error: err, custom: false });
                    });
                break;
            default:
                next({ error: registerMessage["step.out"], custom: false });
                break;
        }
        
    }

    static update(req: Request, res: Response) {}

    static destroy(req: Request, res: Response) {}
}

export default UserController;