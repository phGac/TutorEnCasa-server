import { Request, Response, NextFunction } from 'express';
import { requestMessage, loginMessage } from '../config/messages';
import User from '../db/models/user';
import { FindOptions } from 'sequelize/types';
import logger from '../util/logger';
import { userToShowClient } from '../util/to_show_client';

class SessionController {
    static create(req: Request, res: Response, next: NextFunction) {
        if(! req.body.email || ! req.body.password) {
            res.status(400)
                .json({
                    status: 'failed',
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
                },
                { association: 'role_tutor' },
                { association: 'role_administrator' },
            ]
        };
        User.findOne(options)
            .then((user) => {
                if(! user) {
                    res.status(400).json({
                        status: 'failed',
                        error: loginMessage["user.email.wrong"]
                    });
                    return;
                }
                else if(user.passwords.length == 0) {
                    res.status(400).json({
                        status: 'failed',
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
                                res.json({
                                    status: 'success',
                                    user: userToShowClient(user)
                                });
                                next();
                            }
                            else {
                                res.status(400).json({
                                    status: 'failed',
                                    error: loginMessage["user.password.wrong"]
                                });
                            }
                        })
                        .catch((e) => {
                            logger().error(e);
                            res.status(400).json({
                                status: 'failed',
                                error: requestMessage["error.unknow"]
                            });
                        });
                }
            })
            .catch((e: Error) => {
                logger().error(e);
                res.status(400).json({
                    status: 'failed',
                    error: requestMessage["error.unknow"]
                });
            });
    }
    static destroy(req: Request, res: Response) {
        req.session?.destroy(() => {});
        res.json({ status: 'success' });
    }
}

export default SessionController;