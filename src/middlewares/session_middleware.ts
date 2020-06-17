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
    if(req.session) {
        req.session.reload(() => {});
        if(req.session.user) {
            res.status(400)
                .json({ error: requestMessage["session.already"] });
            return;
        }
    }
    next();
}

export function isAdministrator(req: Request, res: Response, next: NextFunction) {
    if(! req.session || ! req.session.user.roles.includes(UserRole.ADMINISTRATOR)) {
        res.status(400)
            .json({ error: requestMessage["user.role.notAllowed"] });
        return;
    }
    next();
}

export function isTutor(req: Request, res: Response, next: NextFunction) {
    if(! req.session || ! req.session.user.roles.includes(UserRole.TUTOR)) {
        res.status(400)
            .json({ error: requestMessage["user.role.notAllowed"] });
        return;
    }
    next();
}

export function setSession(req: Request, res: Response) {
    if(req.session && res.locals.auth && res.locals.user) {
        const user = res.locals.user;
        const roles = [ UserRole.STUDENT ];
        if(user.role_administrator) {
            user.id_administrator = user.role_administrator.id;
            roles.push(UserRole.ADMINISTRATOR); 
        }
        if(user.role_tutor) {
            user.id_tutor = user.role_tutor.id; 
            roles.push(UserRole.TUTOR); 
        }
        req.session.user = { 
            id: user.id,
            id_tutor: user.id_tutor,
            id_administrator: user.id_administrator,
            email: user.email, 
            dni: user.dni,
            roles: roles
        };
        req.session.save(() => {});
    }
}