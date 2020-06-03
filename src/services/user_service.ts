import User, { UserStatus } from '../db/models/user';
import { registerMessage } from '../config/messages';

export interface UserServiceData {
    id?: number;
    firstname?: string;
    lastname?: string;
    email: string;
    password: string;
    dni: number;
    status?: UserStatus;
}

class UserService {
    static create(data: UserServiceData) {
        return new Promise((resolve, reject) => {
            const { email, dni } = data;
            User.findOne({ where: { dni } })
                .then(async (userbyDni) => {
                    if(userbyDni) return reject({ error: { error: registerMessage["user.exists"] }, custom: true});
                    
                    const userByEmail = await User.findOne({ where: { email } });
                    if(userByEmail) return reject({ error: { error: registerMessage["user.email.used"] }, custom: true});
                    
                    User.create({
                            ...data,
                            status: UserStatus.UNVALIDATED
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
}

export default UserService;