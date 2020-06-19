"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const user_1 = __importDefault(require("../db/models/user"));
const logger_1 = __importDefault(require("../util/logger"));
const messages_1 = require("../config/messages");
const to_show_client_1 = require("../util/to_show_client");
function auth(email, password) {
    return new Promise((resolve, reject) => {
        const options = {
            where: { email },
            include: [
                {
                    association: 'passwords',
                    order: [['createdAt', 'DESC']],
                    limit: 1
                },
                { association: 'role_tutor' },
                { association: 'role_administrator' },
            ]
        };
        user_1.default.findOne(options)
            .then((user) => {
            if (!user) {
                reject(new Error(messages_1.loginMessage["user.email.wrong"]));
            }
            else if (user.passwords.length == 0) {
                reject(new Error(messages_1.loginMessage["user.hasNotPassword"]));
            }
            else {
                user.isValidPassword(password)
                    .then((valid) => {
                    if (valid)
                        resolve(to_show_client_1.userToShowClient(user));
                    else
                        reject(new Error(messages_1.loginMessage["user.password.wrong"]));
                })
                    .catch((e) => {
                    logger_1.default().error(e);
                    reject(new Error(messages_1.requestMessage["error.unknow"]));
                });
            }
        })
            .catch((e) => {
            logger_1.default().error(e);
            reject(new Error(messages_1.requestMessage["error.unknow"]));
        });
    });
}
exports.auth = auth;
