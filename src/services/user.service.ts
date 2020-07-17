import User, { UserStatus } from '../db/models/user.model';
import { registerMessage } from '../config/messages';
import { WhereOptions } from 'sequelize/types';
import { encryptPassword } from './hash.service';

export interface UserServiceCreateData {
    firstname?: string;
    lastname?: string;
    email: string;
    password: string;
    dni: number;
    status?: UserStatus;
}

export interface UserServiceUpdateData {
    firstname?: string;
    lastname?: string;
    birthdate?: Date;
    email?: string;
    status?: UserStatus;
}

class UserService {
    static create(data: UserServiceCreateData) {
        return new Promise((resolve: (user: User) => void, reject) => {
            const { email, dni } = data;
            User.findOne({ where: { dni } })
                .then((userbyDni) => {
                    if(userbyDni) {
                        reject({ error: new Error(registerMessage["user.exists"]), custom: true});
                    }
                    else {
                        User.findOne({ where: { email } })
                            .then((userByEmail) => {
                                if(userByEmail) {
                                    reject({ error: new Error(registerMessage["user.email.used"]), custom: true});
                                }
                                else {
                                    const password = data.password;
                                    delete data.password;
                                    
                                    encryptPassword(password, false)
                                        .then(() => {
                                            User.create({
                                                    ...data,
                                                    passwords: [ { password } ],
                                                    status: UserStatus.UNVALIDATED
                                                },
                                                {
                                                    include: [ { association: 'passwords' } ]
                                                })
                                                .then((user) => {
                                                    resolve(user);
                                                })
                                                .catch((err) => {
                                                    reject({
                                                        error: err,
                                                        custom: false
                                                    });
                                                });
                                        })
                                        .catch((e) => {
                                            reject(e);
                                        });
                                }
                            })
                            .catch((e) => {
                                reject({ error: e, custom: false });
                            });
                    }
                })
                .catch((err) => {
                    reject({
                        error: new Error(err),
                        custom: false
                    });
                });
        });
    }

    static update(data: UserServiceUpdateData, where: WhereOptions) {
        return new Promise((resolve: (info: { count: number, users: User[] }) => void, reject: (e: { error: Error, custom: boolean }) => void) => {
            User.update(data, { where })
                .then((info) => {
                    User.findAll({ where, raw: true })
                        .then((users) => {
                            resolve({
                                count: info[0],
                                users: users,
                            });
                        });
                })
                .catch((err) => reject({ error: err, custom: false }));
        });
    }
}

export default UserService;