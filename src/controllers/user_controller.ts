import { Request, Response } from 'express';
import logger from '../util/logger';
import UserService from '../services/user_service';
import { registerMessage, requestMessage } from '../config/messages';
import User from '../db/models/user';

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
                        if(user) {
                            if(req.session) {
                                req.session.user = { email, dni };
                                req.session.save(() => {});
                            }
                            res.json({ status: 'ok', message: registerMessage["user.status.ok"] });
                        }
                    })
                    .catch((err) => {
                        if(err.custom) {
                            res.json({ error: err.error.error });
                        }
                        else {
                            logger().error(err);
                            res.json({ error: true });
                        }
                    });
                break;
            case '2':
                if(! req.body.dni || ! req.body.firstname || ! req.body.lastname || ! req.body.birthdate) {
                    return res.json({ error: requestMessage["params.missing"] });
                }
                //
                break;
            default:
                res.json({ error: registerMessage["step.out"] });
        }
        
    }
}

export default UserController;