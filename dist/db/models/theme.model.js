"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
class Theme extends sequelize_1.Model {
}
Theme.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(20)
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE
    }
}, { sequelize: index_1.default });
// @ts-ignore
Theme.associate = function (models) {
    const { Tutor, TutorTheme } = models;
    Theme.belongsToMany(Tutor, {
        as: 'tutors',
        through: TutorTheme,
        foreignKey: 'id_theme',
        otherKey: 'id_tutor'
    });
};
exports.default = Theme;
