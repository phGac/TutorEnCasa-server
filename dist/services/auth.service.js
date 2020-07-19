"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const user_model_1 = __importDefault(require("../db/models/user.model"));
const messages_1 = require("../config/messages");
const to_show_client_util_1 = require("../util/to_show_client.util");
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
        user_model_1.default.findOne(options)
            .then((user) => {
            if (!user) {
                reject({ error: new Error(messages_1.loginMessage["user.email.wrong"]), custom: true });
            }
            else if (user.passwords.length == 0) {
                reject({ error: new Error(messages_1.loginMessage["user.hasNotPassword"]), custom: true });
            }
            else {
                user.isValidPassword(password)
                    .then((valid) => {
                    if (valid)
                        resolve(to_show_client_util_1.userToShowClient(user));
                    else
                        reject({ error: new Error(messages_1.loginMessage["user.password.wrong"]), custom: true });
                })
                    .catch((e) => {
                    reject({ error: e, custom: false });
                });
            }
        })
            .catch((e) => {
            reject({ error: e, custom: false });
        });
    });
}
exports.auth = auth;
