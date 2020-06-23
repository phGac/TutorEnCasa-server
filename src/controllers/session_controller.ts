import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { requestMessage, loginMessage } from '../config/messages';
import { auth } from '../services/auth_service';

class SessionValidatorController {
    static create(req: Request, res: Response, next: NextFunction) {
        if(! req.body.email || ! req.body.password)
            return next({ error: requestMessage["params.missing"], custom: true });

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
                const token = jwt.sign(user, process.env.JWT_KEY || '', { expiresIn: 1440 });
                res.json({ status: 'success', user, token });
            })
            .catch((e) => {
                next(e);
                res.json({ status: 'failed', error: e });
                next({ error: e, custom: true });
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