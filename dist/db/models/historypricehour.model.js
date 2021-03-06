"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
class HistoryPriceHour extends sequelize_1.Model {
}
HistoryPriceHour.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    id_tutor_theme: {
        type: sequelize_1.DataTypes.INTEGER
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 16500
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, { sequelize: index_1.default });
// @ts-ignore
HistoryPriceHour.associate = function (models) {
    const { TutorTheme } = models;
    HistoryPriceHour.belongsTo(TutorTheme, {
        as: 'tutor_theme',
        foreignKey: 'id_tutor_theme'
    });
};
exports.default = HistoryPriceHour;
