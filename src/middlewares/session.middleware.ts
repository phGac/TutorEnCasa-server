import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

import { requestMessage, loginMessage } from "../config/messages";
import User, { UserRole } from "../db/models/user.model";
import { Tutor } from "../db/models";
import { TutorStatus } from "../db/models/tutor.model";
import { FindOptions } from "sequelize/types";

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['access-token'] || req.cookies['auth-token'];
    if(token && typeof token == 'string') {
        jwt.verify(token, process.env.JWT_KEY || '', (err, decoded) => {
            if(err) return next({ error: loginMessage["user.token.notfound"], custom: true });
            req.user = decoded;
            next();
        })
    }
    else {
        next({ error: loginMessage["user.token.notfound"], custom: true });
    }
}

export function isNotLoggedIn(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['access-token'];
    if(token)
        next({ error: requestMessage["session.already"], custom: true });
    else
        next();
}

export function isAdministrator(req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    if(! req.user?.roles.includes(UserRole.ADMINISTRATOR))
        return next({ error: requestMessage["user.role.notAllowed"], custom: true });
    next();
}

export function isTutor(req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    if(! req.user?.roles.includes(UserRole.TUTOR))
        return next({ error: requestMessage["user.role.notAllowed"], custom: true });
    next();
}

export function isNotTutor(req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    const { id } = req.user;
    const options: FindOptions = {
        where: { id },
        include: [{ 
            association: 'role_tutor',
            required: true
        }]
    };
    User.findOne(options)
        .then((user) => {
            // @ts-ignore
            if(user && (user.role_tutor.status == TutorStatus.ACTIVE || user.role_tutor.status == TutorStatus.UNVALIDATED)) 
                next({ error: 'Ya has solicitado ser tutor', custom: true }); // requestMessage["user.role.notAllowed"]
            else
                next();
        })
        .catch((e) => {
            next({ error: e, custom: false });
        });
}