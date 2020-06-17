"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
class Tutor extends sequelize_1.Model {
}
Tutor.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    id_user: {
        type: sequelize_1.DataTypes.INTEGER,
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
Tutor.associate = function (models) {
    const { Class, AvailabilityTime, HistoryPriceHour, User, StudentTutor, TutorTheme, Theme } = models;
    Tutor.hasMany(Class, {
        as: 'classes',
        foreignKey: 'id_tutor'
    });
    Tutor.hasMany(AvailabilityTime, {
        as: 'times',
        foreignKey: 'id_tutor'
    });
    Tutor.hasMany(HistoryPriceHour, {
        as: 'priceses',
        foreignKey: 'id_tutor'
    });
    Tutor.belongsToMany(User, {
        as: 'students',
        through: StudentTutor,
        foreignKey: 'id_tutor',
        otherKey: 'id_student'
    });
    Tutor.belongsToMany(Theme, {
        as: 'themes',
        through: TutorTheme,
        foreignKey: 'id_tutor',
        otherKey: 'id_theme'
    });
};
exports.default = Tutor;
