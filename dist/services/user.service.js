"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importStar(require("../db/models/user.model"));
const messages_1 = require("../config/messages");
const hash_service_1 = require("./hash.service");
class UserService {
    static create(data) {
        return new Promise((resolve, reject) => {
            const { email, dni } = data;
            user_model_1.default.findOne({ where: { dni } })
                .then((userbyDni) => {
                if (userbyDni) {
                    reject({ error: new Error(messages_1.registerMessage["user.exists"]), custom: true });
                }
                else {
                    user_model_1.default.findOne({ where: { email } })
                        .then((userByEmail) => {
                        if (userByEmail) {
                            reject({ error: new Error(messages_1.registerMessage["user.email.used"]), custom: true });
                        }
                        else {
                            const password = data.password;
                            delete data.password;
                            hash_service_1.encryptPassword(password, false)
                                .then(() => {
                                user_model_1.default.create(Object.assign(Object.assign({}, data), { passwords: [{ password }], status: user_model_1.UserStatus.UNVALIDATED }), {
                                    include: [{ association: 'passwords' }]
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
    static update(data, where) {
        return new Promise((resolve, reject) => {
            user_model_1.default.update(data, { where })
                .then((info) => {
                user_model_1.default.findAll({ where, raw: true })
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
exports.default = UserService;
