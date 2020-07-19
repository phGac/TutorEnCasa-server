"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
class ClassTime extends sequelize_1.Model {
}
ClassTime.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_class: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_availability_time: {
        type: sequelize_1.DataTypes.INTEGER
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE
    }
}, { sequelize: index_1.default });
exports.default = ClassTime;
