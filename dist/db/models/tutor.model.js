"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorStatus = void 0;
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
    description: {
        type: sequelize_1.DataTypes.STRING(500),
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
Tutor.associate = function (models) {
    const { Class, AvailabilityTime, HistoryPriceHour, User, TutorTheme, Theme, TutorFileCertificate, File } = models;
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
    Tutor.belongsTo(User, {
        as: 'user',
        foreignKey: 'id_user'
    });
    Tutor.belongsToMany(Theme, {
        as: 'themes',
        through: TutorTheme,
        foreignKey: 'id_tutor',
        otherKey: 'id_theme'
    });
    Tutor.belongsToMany(File, {
        as: 'certificates',
        through: TutorFileCertificate,
        foreignKey: 'id_tutor',
        otherKey: 'id_file'
    });
};
var TutorStatus;
(function (TutorStatus) {
    TutorStatus[TutorStatus["UNVALIDATED"] = 0] = "UNVALIDATED";
    TutorStatus[TutorStatus["ACTIVE"] = 1] = "ACTIVE";
    TutorStatus[TutorStatus["INACTIVE"] = 2] = "INACTIVE";
    TutorStatus[TutorStatus["REJECTED"] = 3] = "REJECTED";
})(TutorStatus = exports.TutorStatus || (exports.TutorStatus = {}));
exports.default = Tutor;
