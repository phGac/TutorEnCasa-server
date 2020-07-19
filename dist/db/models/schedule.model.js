"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
class Schedule extends sequelize_1.Model {
}
Schedule.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    id_class: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_student: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
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
Schedule.associate = function (models) {
    const { Class, User } = models;
    Schedule.belongsTo(Class, {
        as: 'class',
        foreignKey: 'id_class'
    });
    Schedule.belongsTo(User, {
        as: 'student',
        foreignKey: 'id_student'
    });
};
exports.default = Schedule;
