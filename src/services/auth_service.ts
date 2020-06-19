import { FindOptions } from "sequelize/types";
import User from "../db/models/user";
import logger from "../util/logger";
import { requestMessage, loginMessage } from "../config/messages";
import { userToShowClient, UserClient } from "../util/to_show_client";

export function auth(email: string, password: string) {
    return new Promise((resolve: (user: UserClient) => void, reject) => {
        const options: FindOptions = {
            where: { email },
            include: [
                {
                    association: 'passwords',
                    order: [ [ 'createdAt', 'DESC' ]],
                    limit: 1
                },
                { association: 'role_tutor' },
                { association: 'role_administrator' },
            ]
        };
        User.findOne(options)
            .then((user) => {
                if(! user) {
                    reject({ error: loginMessage["user.email.wrong"], custom: true });
                }
                else if(user.passwords.length == 0) {
                    reject({ error: loginMessage["user.hasNotPassword"], custom: true });
                }
                else {
                    user.isValidPassword(password)
                        .then((valid) => {
                            if(valid) resolve(userToShowClient(user));
                            else reject({ error: loginMessage["user.password.wrong"], custom: true });
                        })
                        .catch((e) => {
                            //logger().error(e);
                            reject({ error: e, custom: false });
                        });
                }
            })
            .catch((e: Error) => {
                logger().error(e);
                reject( new Error(requestMessage["error.unknow"]) );
            });
    });
}

