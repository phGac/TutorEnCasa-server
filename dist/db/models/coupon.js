"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const uuid_1 = require("uuid");
const index_1 = __importDefault(require("../index"));
class Coupon extends sequelize_1.Model {
}
Coupon.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: uuid_1.v4()
    },
    id_user_from: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_user_to: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    message: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    expires: {
        type: sequelize_1.DataTypes.DATE
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}, { sequelize: index_1.default });
// @ts-ignore
Coupon.associate = function (models) {
    const { User } = models;
    Coupon.belongsTo(User, {
        as: 'user',
        foreignKey: 'id_user'
    });
};
exports.default = Coupon;
