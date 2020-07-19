"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
class Class extends sequelize_1.Model {
}
Class.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    id_tutor: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_tutor_theme: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    room: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    price_hour: {
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
Class.associate = function (models) {
    const { Tutor, Schedule, ClassRating, HistoryStatusClass, ClassTime, AvailabilityTime } = models;
    Class.belongsTo(Tutor, {
        as: 'tutor',
        foreignKey: 'id_tutor'
    });
    Class.hasMany(Schedule, {
        as: 'schedules',
        foreignKey: 'id_class'
    });
    Class.hasMany(ClassRating, {
        as: 'ratings',
        foreignKey: 'id_class'
    });
    Class.hasMany(HistoryStatusClass, {
        as: 'statuses',
        foreignKey: 'id_class'
    });
    Class.belongsToMany(AvailabilityTime, {
        as: 'times',
        through: ClassTime,
        foreignKey: 'id_class',
        otherKey: 'id_availability_time'
    });
};
exports.default = Class;
