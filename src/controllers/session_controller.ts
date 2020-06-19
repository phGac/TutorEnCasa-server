import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { requestMessage, loginMessage } from '../config/messages';
import { auth } from '../services/auth_service';

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
        auth(email, password)
            .then((user) => {
                const token = jwt.sign(user, process.env.JWT_KEY || '', { expiresIn: 1440 });
                res
                    //.cookie('auth-token', token)
                    .json({ status: 'success', user, token });
            })
            .catch((e) => {
                next(e);
                res.json({ status: 'failed', error: e });
            });
    }
    static destroy(req: Request, res: Response) {
        if(req.cookies['auth-token'])
            res.clearCookie('auth-token');
        res.json({ status: 'success' });
    }
}

export default SessionController;