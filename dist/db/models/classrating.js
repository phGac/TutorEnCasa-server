"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
class ClassRating extends sequelize_1.Model {
}
ClassRating.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    id_class: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_user: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    value: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    commentary: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
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
ClassRating.associate = function (models) { };
exports.default = ClassRating;
