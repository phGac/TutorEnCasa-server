"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryStatusClassStatus = void 0;
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
class HistoryStatusClass extends sequelize_1.Model {
}
HistoryStatusClass.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    id_class: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    status: {
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
HistoryStatusClass.associate = function (models) {
    const { Class } = models;
    HistoryStatusClass.belongsTo(Class, {
        as: 'class',
        foreignKey: 'id_class'
    });
};
var HistoryStatusClassStatus;
(function (HistoryStatusClassStatus) {
    HistoryStatusClassStatus[HistoryStatusClassStatus["UNPAY"] = 0] = "UNPAY";
    HistoryStatusClassStatus[HistoryStatusClassStatus["PAY"] = 1] = "PAY";
    HistoryStatusClassStatus[HistoryStatusClassStatus["CANCELL"] = 2] = "CANCELL";
    HistoryStatusClassStatus[HistoryStatusClassStatus["FINISHED"] = 3] = "FINISHED";
    HistoryStatusClassStatus[HistoryStatusClassStatus["STARTED"] = 4] = "STARTED";
})(HistoryStatusClassStatus || (HistoryStatusClassStatus = {}));
exports.HistoryStatusClassStatus = HistoryStatusClassStatus;
exports.default = HistoryStatusClass;
