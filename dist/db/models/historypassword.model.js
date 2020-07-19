"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
const hash_service_1 = require("../../services/hash.service");
class HistoryPassword extends sequelize_1.Model {
}
HistoryPassword.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}, { sequelize: index_1.default });
HistoryPassword.beforeCreate(function (historyPassword, options) {
    return new Promise((resolve, reject) => {
        if (historyPassword.password) {
            hash_service_1.encryptPassword(historyPassword.password)
                .then((hash) => {
                if (typeof hash == 'string')
                    historyPassword.password = hash;
                resolve();
            })
                .catch(err => {
                reject(err);
            });
        }
    });
});
// @ts-ignore
HistoryPassword.associate = function (models) {
    const { User } = models;
    HistoryPassword.belongsTo(User, {
        as: 'user',
        foreignKey: 'id_user'
    });
};
exports.default = HistoryPassword;
