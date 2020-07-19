"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
class File extends sequelize_1.Model {
}
File.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100)
    },
    mime: {
        type: sequelize_1.DataTypes.STRING(20)
    },
    key: {
        type: sequelize_1.DataTypes.STRING
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, {
    sequelize: index_1.default,
    timestamps: false
});
// @ts-ignore
File.associate = function (models) {
    const { TutorFileCertificate } = models;
    File.hasOne(TutorFileCertificate, {
        as: 'tutor_certificate',
        foreignKey: 'id_file'
    });
};
exports.default = File;
