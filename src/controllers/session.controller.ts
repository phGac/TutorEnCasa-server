import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { requestMessage, loginMessage } from '../config/messages';
import { auth } from '../services/auth.service';
import { HistoryAccess } from '../db/models';
import logger from '../util/logger.util';
import { userToShowClient } from '../util/to_show_client.util';
import { TutorStatus } from '../db/models/tutor.model';
import { UserRole } from '../db/models/user.model';

class SessionValidatorController {
    static create(req: Request, res: Response, next: NextFunction) {
        if(! req.body.email || ! req.body.password)
            return next({ error: new Error(requestMessage["params.missing"]), custom: true });

        res.locals.email = req.body.email;
        res.locals.password = req.body.password;
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
}

class SessionController {
    static create(req: Request, res: Response, next: NextFunction) {
        const { email, password } = res.locals;
        auth(email, password)
            .then((user) => {
                HistoryAccess.create({
                    id_user: user.id,
                    ip: req.clientIp
                })
                .catch((e) => {
                    logger().error(e, 'APP');
                });
                let userClient = userToShowClient(user);
                let userTokenClient = userToShowClient(user);
                // @ts-ignore
                if(user.role_tutor && user.role_tutor.status != TutorStatus.ACTIVE) {
                    userClient.roles = userClient.roles.filter((role) => (role != UserRole.TUTOR));
                }
                const token = jwt.sign(userTokenClient, process.env.JWT_KEY || '', { expiresIn: '6h' });
                res.json({ status: 'success', user: userClient, token });
            })
            .catch((e) => {
                next(e);
            });
    }
    static destroy(req: Request, res: Response) {
        if(req.cookies['auth-token'])
            res.clearCookie('auth-token');
        res.json({ status: 'success' });
    }
}

export {
    SessionValidatorController
}

export default SessionController;