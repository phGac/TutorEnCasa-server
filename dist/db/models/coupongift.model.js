"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
class CouponGift extends sequelize_1.Model {
}
CouponGift.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_coupon: {
        type: sequelize_1.DataTypes.STRING(10)
    },
    id_user: {
        type: sequelize_1.DataTypes.INTEGER
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE
    }
}, { sequelize: index_1.default });
// @ts-ignore
CouponGift.associate = function (models) {
    const { User, Coupon } = models;
    CouponGift.belongsTo(User, {
        as: 'user',
        foreignKey: 'id_user'
    });
    CouponGift.belongsTo(Coupon, {
        as: 'coupon',
        foreignKey: 'id_coupon'
    });
};
exports.default = CouponGift;
