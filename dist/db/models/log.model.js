"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
class Log extends sequelize_1.Model {
}
Log.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: sequelize_1.DataTypes.STRING(25)
    },
    level: {
        type: sequelize_1.DataTypes.STRING(20)
    },
    message: {
        type: sequelize_1.DataTypes.STRING(255)
    },
    ip: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: true
    },
    path: {
        type: sequelize_1.DataTypes.STRING(300)
    },
    trace: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, { sequelize: index_1.default, timestamps: false });
exports.default = Log;
