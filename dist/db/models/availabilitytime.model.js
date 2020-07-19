"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityTimeStatus = void 0;
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
class AvailabilityTime extends sequelize_1.Model {
}
AvailabilityTime.init({
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
    minutes: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 30
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
AvailabilityTime.associate = function (models) {
    const { Tutor } = models;
    AvailabilityTime.belongsTo(Tutor, {
        as: 'tutor',
        foreignKey: 'id_tutor'
    });
};
var AvailabilityTimeStatus;
(function (AvailabilityTimeStatus) {
    AvailabilityTimeStatus[AvailabilityTimeStatus["INACTIVE"] = 0] = "INACTIVE";
    AvailabilityTimeStatus[AvailabilityTimeStatus["ACTIVE"] = 1] = "ACTIVE";
    AvailabilityTimeStatus[AvailabilityTimeStatus["RESERVED"] = 2] = "RESERVED";
})(AvailabilityTimeStatus || (AvailabilityTimeStatus = {}));
exports.AvailabilityTimeStatus = AvailabilityTimeStatus;
exports.default = AvailabilityTime;
