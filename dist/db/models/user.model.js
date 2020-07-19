"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.UserStatus = void 0;
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
const index_1 = __importDefault(require("../index"));
const messages_1 = require("../../config/messages");
class User extends sequelize_1.Model {
    isValidPassword(password) {
        return new Promise((resolve, reject) => {
            if (!this.passwords || this.passwords.length == 0) {
                reject({ error: messages_1.loginMessage["user.hasNotPassword"], custom: true });
                return;
            }
            const historyPassword = (this.passwords[(this.passwords.length - 1)]);
            bcrypt_1.default.compare(password, historyPassword.password, (err, result) => {
                if (err)
                    return reject(err);
                resolve(result);
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
    dni: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    birthdate: {
        type: sequelize_1.DataTypes.DATE,
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
// @ts-ignore
User.associate = function (models) {
    const { Tutor, Schedule, Class, HistoryAccess, HistoryPassword, ClassRating, Administrator, Coupon, CouponGift } = models;
    User.hasMany(HistoryPassword, {
        as: 'passwords',
        foreignKey: 'id_user'
    });
    User.belongsToMany(Class, {
        as: 'classes',
        through: Schedule,
        foreignKey: 'id_student',
        otherKey: 'id_class'
    });
    User.hasMany(HistoryAccess, {
        as: 'accesses',
        foreignKey: 'id_user'
    });
    User.hasMany(ClassRating, {
        as: 'ratings',
        foreignKey: 'id_user'
    });
    User.hasOne(Tutor, {
        as: 'role_tutor',
        foreignKey: 'id_user'
    });
    User.hasOne(Administrator, {
        as: 'role_administrator',
        foreignKey: 'id_user'
    });
    User.hasMany(Coupon, {
        as: 'coupons',
        foreignKey: 'id_user'
    });
    User.hasMany(CouponGift, {
        as: 'gifts',
        foreignKey: 'id_user'
    });
};
var UserStatus;
(function (UserStatus) {
    UserStatus[UserStatus["ACTIVE"] = 0] = "ACTIVE";
    UserStatus[UserStatus["INACTIVE"] = 1] = "INACTIVE";
    UserStatus[UserStatus["UNVALIDATED"] = 2] = "UNVALIDATED";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));
;
var UserRole;
(function (UserRole) {
    UserRole[UserRole["STUDENT"] = 0] = "STUDENT";
    UserRole[UserRole["TUTOR"] = 1] = "TUTOR";
    UserRole[UserRole["ADMINISTRATOR"] = 2] = "ADMINISTRATOR";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
exports.default = User;
