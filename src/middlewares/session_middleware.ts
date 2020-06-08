import { Request, Response, NextFunction } from "express";
import { requestMessage } from "../config/messages";
import { UserRole } from "../db/models/user";

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    if(! req.session || ! req.session.user) {
        res.status(400)
            .json({ error: requestMessage["session.unloged"] });
        return;
    }
    next();
}

export function isNotLoggedIn(req: Request, res: Response, next: NextFunction) {
    if(req.session && req.session.user) {
        res.status(400)
            .json({ error: requestMessage["session.already"] });
        return;
    }
    next();
}

export function isAdministrator(req: Request, res: Response, next: NextFunction) {
    if(! req.session || ! req.session.user.roles.include(UserRole.ADMINISTRATOR)) {
        res.status(400)
            .json({ error: requestMessage["user.role.notAllowed"] });
        return;
    }
    next();
}

export function isTutor(req: Request, res: Response, next: NextFunction) {
    if(! req.session || ! req.session.user.roles.include(UserRole.TUTOR)) {
        res.status(400)
            .json({ error: requestMessage["user.role.notAllowed"] });
        return;
    }
    next();
}

export function setSession(req: Request, res: Response) {
    console.log(res.locals.user);
    if(req.session && res.locals.auth && res.locals.user) {
        const user = res.locals.user;
        req.session.user = { 
            id: user.id,
            email: user.email, 
            dni: user.dni,
            roles: [ UserRole.STUDENT ]
        };
        req.session.save(() => {});
    }
}