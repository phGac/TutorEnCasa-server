import { Request, Response } from 'express';
import logger from '../util/logger';
import UserService from '../services/user_service';
import { registerMessage, requestMessage } from '../config/messages';
import User, { UserStatus } from '../db/models/user';

class UserController {
    static show(req: Request, res: Response) {
        const id = req.params.id;
        User.findOne({ where: { id } })
            .then((user) => {
                if(user) return res.json({ user });
                res.json({ user: null });
            })
            .catch((err) => {
                logger().error(err);
                res.json({ error: requestMessage["error.unknow"] });
            });
    }

    static create(req: Request, res: Response) {
        switch (req.params.step) {
            case '1':
                if(! req.body.email || ! req.body.password || ! req.body.dni) {
                    return res.json({ error: requestMessage["params.missing"] });
                }
                const { email, password, dni } = req.body;
                UserService.create({ email, password, dni })
                    .then((user) => {
                        res.json({ status: 'ok', message: registerMessage["user.status.ok"] });
                    })
                    .catch((err) => {
                        if(err.custom) {
                            res.json({ error: err.error });
                        }
                        else {
                            logger().error(err.error);
                            res.json({ error: true });
                        }
                    });
                break;
            case '2':
                if(! req.body.firstname || ! req.body.lastname || ! req.body.birthdate || ! req.body.dni) {
                    return res.json({ error: requestMessage["params.missing"] });
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
                            res.json({ user: info.users[0] });
                        }
                        else {
                            res.json({ error: registerMessage["step.two.user.notFound"] });
                        }
                    })
                    .catch((err) => {
                        logger().error(err);
                        res.json({ error: requestMessage["error.unknow"] });
                    });
                break;
            default:
                res.json({ error: registerMessage["step.out"] });
        }
        
    }

    static update(req: Request, res: Response) {}

    static destroy(req: Request, res: Response) {}
}

export default UserController;