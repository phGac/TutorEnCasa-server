"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatus = void 0;
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
const index_1 = __importDefault(require("../index"));
const hash_1 = require("../../services/hash");
const logger_1 = __importDefault(require("../../util/logger"));
class User extends sequelize_1.Model {
    isValidPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt_1.default.compare(password, this.password, (err, result) => {
                if (err)
                    return reject(err);
                resolve(result);
            });
        });
    }
    setPassword(password, passwordRepeat) {
        return new Promise((resolve, reject) => {
            if (password != passwordRepeat)
                return reject('Las contraseñas no coinciden');
            hash_1.encryptPassword(password)
                .then((hash) => {
                if (typeof hash == 'string') {
                    this.password = hash;
                    resolve();
                }
                else {
                    reject('El tipo de la variable es incorrecto');
                }
            })
                .catch(err => {
                logger_1.default().error(err);
                reject('Desconocido');
            });
        });
    }
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    firstname: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    dni: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, { sequelize: index_1.default });
User.beforeCreate('PASSWORD', function (user, options) {
    return new Promise((resolve, reject) => {
        if (user.password) {
            hash_1.encryptPassword(user.password)
                .then((hash) => {
                if (typeof hash == 'string')
                    user.password = hash;
                resolve();
            })
                .catch(err => {
                reject(err);
            });
        }
    });
});
// @ts-ignore
User.associate = function (models) {
    //
};
var UserStatus;
(function (UserStatus) {
    UserStatus[UserStatus["ACTIVE"] = 0] = "ACTIVE";
    UserStatus[UserStatus["INACTIVE"] = 1] = "INACTIVE";
    UserStatus[UserStatus["UNVALIDATED"] = 2] = "UNVALIDATED";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));
;
exports.default = User;
