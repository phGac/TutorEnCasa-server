"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
class ClassPayment extends sequelize_1.Model {
}
ClassPayment.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    id_class: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_student: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_payment: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_coupon: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    createdAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    }
}, { sequelize: index_1.default });
// @ts-ignore
ClassPayment.associate = function (models) {
    const { Class, Payment, Coupon } = models;
    ClassPayment.belongsTo(Class, {
        as: 'class',
        foreignKey: 'id_class'
    });
    ClassPayment.belongsTo(Payment, {
        as: 'payment',
        foreignKey: 'id_payment'
    });
    ClassPayment.belongsTo(Coupon, {
        as: 'coupon',
        foreignKey: 'id_coupon'
    });
};
exports.default = ClassPayment;
