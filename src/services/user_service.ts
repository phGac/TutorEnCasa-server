import User, { UserStatus } from '../db/models/user';
import { registerMessage } from '../config/messages';
import { WhereOptions } from 'sequelize/types';

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
                .then(async (userbyDni) => {
                    if(userbyDni) return reject({ error: { error: registerMessage["user.exists"] }, custom: true});
                    
                    const userByEmail = await User.findOne({ where: { email } });
                    if(userByEmail) return reject({ error: { error: registerMessage["user.email.used"] }, custom: true});
                    
                    const password = data.password;
                    delete data.password;

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
                .catch((err) => {
                    reject({
                        error: err,
                        custom: false
                    });
                });
        });
    }
    static update(data: UserServiceUpdateData, where: WhereOptions) {
        return new Promise((resolve: (info: { count: number, users: User[] }) => void, reject: (e: Error) => void) => {
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
                .catch((err) => reject(err));
        });
    }
}

export default UserService;