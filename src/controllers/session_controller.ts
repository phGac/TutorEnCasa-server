import e, { Request, Response } from 'express';
import { requestMessage, loginMessage } from '../config/messages';
import User from '../db/models/user';
import { FindOptions } from 'sequelize/types';
import logger from '../util/logger';

class SessionController {
    static create(req: Request, res: Response) {
        if(! req.body.email || ! req.body.password) {
            res.status(400)
                .json({
                    error: requestMessage["params.missing"]
                });
            return;
        }
        const { email, password } = req.body;
        const options: FindOptions = {
            where: { email },
            include: [
                {
                    association: 'passwords',
                    order: [ [ 'createdAt', 'DESC' ]],
                    limit: 1
                }
            ]
        };
        User.findOne(options)
            .then((user) => {
                if(! user) {
                    res.json({
                        error: loginMessage["user.email.wrong"]
                    });
                    return;
                }
                else if(user.passwords.length == 0) {
                    res.json({
                        error: loginMessage["user.hasNotPassword"]
                    });
                    return;
                }
                else {
                    user.isValidPassword(password)
                        .then((valid) => {
                            if(valid) {
                                res.locals.user = user;
                                res.locals.auth = true;
                                delete user.passwords;
                                res.json({
                                    status: 'ok',
                                    user: user
                                });
                            }
                            else {
                                res.json({
                                    error: loginMessage["user.password.wrong"]
                                });
                            }
                        })
                        .catch((e) => {
                            logger().error(e);
                        });
                }
            })
            .catch((e: Error) => {
                logger().error(e);
                res.json({
                    error: requestMessage["error.unknow"]
                });
            });
    }
    static destroy(req: Request, res: Response) {
        //
    }
}

export default SessionController;