"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryReportType = void 0;
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
class HistoryReport extends sequelize_1.Model {
}
HistoryReport.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_administrator: {
        type: sequelize_1.DataTypes.INTEGER
    },
    type: {
        type: sequelize_1.DataTypes.INTEGER
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}, { sequelize: index_1.default });
// @ts-ignore
HistoryReport.associate = function (models) {
    const { Administrator } = models;
    HistoryReport.belongsTo(Administrator, {
        as: 'administrator',
        foreignKey: 'id_administrator'
    });
};
var HistoryReportType;
(function (HistoryReportType) {
    //
})(HistoryReportType || (HistoryReportType = {}));
exports.HistoryReportType = HistoryReportType;
exports.default = HistoryReport;
