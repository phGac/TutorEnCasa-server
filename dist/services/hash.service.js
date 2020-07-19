"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const zxcvbn_1 = __importDefault(require("zxcvbn"));
function encryptPassword(password, encrypt = true) {
    return new Promise((resolve, reject) => {
        if (password.length < 6)
            return reject({ error: new Error('La constraseña es muy corta, mínimo 6 carácteres!'), custom: true });
        const score = zxcvbn_1.default(password).score;
        if (score < 2)
            return reject({ error: new Error('La constraseña es debil'), custom: true });
        if (encrypt) {
            bcrypt_1.default.hash(password, 10, (err, hash) => {
                if (err)
                    return reject({ error: err, custom: false });
                resolve(hash);
            });
        }
        else {
            resolve();
        }
    });
}
exports.encryptPassword = encryptPassword;
;
