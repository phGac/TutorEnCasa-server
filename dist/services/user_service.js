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
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importStar(require("../db/models/user"));
const messages_1 = require("../config/messages");
class UserService {
    static create(data) {
        return new Promise((resolve, reject) => {
            const { email, dni } = data;
            user_1.default.findOne({ where: { dni } })
                .then((userbyDni) => __awaiter(this, void 0, void 0, function* () {
                if (userbyDni)
                    return reject({ error: messages_1.registerMessage["user.exists"], custom: true });
                const userByEmail = yield user_1.default.findOne({ where: { email } });
                if (userByEmail)
                    return reject({ error: messages_1.registerMessage["user.email.used"], custom: true });
                const password = data.password;
                delete data.password;
                user_1.default.create(Object.assign(Object.assign({}, data), { passwords: [{ password }], status: user_1.UserStatus.UNVALIDATED }), {
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
            }))
                .catch((err) => {
                reject({
                    error: err,
                    custom: false
                });
            });
        });
    }
    static update(data, where) {
        return new Promise((resolve, reject) => {
            user_1.default.update(data, { where })
                .then((info) => {
                user_1.default.findAll({ where, raw: true })
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
exports.default = UserService;
