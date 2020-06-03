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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importStar(require("../db/models/user"));
const logger_1 = __importDefault(require("../util/logger"));
;
class UserFactory {
    static student(config) {
        switch (config.type) {
            case 'create':
                return user_1.default.create({
                    email: config.data.email,
                    password: config.data.password,
                    dni: config.data.dni,
                    status: user_1.UserStatus.UNVALIDATED
                })
                    .then((user) => {
                    return user;
                })
                    .catch((err) => {
                    logger_1.default().error(err);
                    return err;
                });
            case 'find': break;
        }
    }
    static tutor() {
        //
    }
}
exports.default = UserFactory;
