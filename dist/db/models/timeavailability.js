"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
class TimeAvailability extends sequelize_1.Model {
}
TimeAvailability.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_tutor: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    start: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    finish: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    status: {
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
TimeAvailability.associate = function (models) {
    //
};
exports.default = TimeAvailability;
