import { Request, Response } from 'express';
import UserModel from '../Entities/user';

export default class {
    static index(req: Request, res: Response) {
        res.send('User');
    }

    static create(req: Request, res: Response) {
        const user = new UserModel({
            id: 1,
            email: 'email@mail.com',
            password: null,
            dni: 123456,
            status: 1,
            isAdmin: false,
            createdAt: null,
            modifiedAt: null
        });

        res.json(user);
    }
}