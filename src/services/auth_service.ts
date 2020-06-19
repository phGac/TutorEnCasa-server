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
                    reject( new Error(loginMessage["user.email.wrong"]) );
                }
                else if(user.passwords.length == 0) {
                    reject( new Error(loginMessage["user.hasNotPassword"]) );
                }
                else {
                    user.isValidPassword(password)
                        .then((valid) => {
                            if(valid) resolve(userToShowClient(user));
                            else reject( new Error(loginMessage["user.password.wrong"]) );
                        })
                        .catch((e) => {
                            logger().error(e);
                            reject( new Error(requestMessage["error.unknow"]) );
                        });
                }
            })
            .catch((e: Error) => {
                logger().error(e);
                reject( new Error(requestMessage["error.unknow"]) );
            });
    });
}

