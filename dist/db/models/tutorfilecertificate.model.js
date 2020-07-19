"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorFileCertificateType = void 0;
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
class TutorFileCertificate extends sequelize_1.Model {
}
TutorFileCertificate.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_tutor: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_file: {
        type: sequelize_1.DataTypes.INTEGER
    },
    type: {
        type: sequelize_1.DataTypes.INTEGER
    },
    description: {
        type: sequelize_1.DataTypes.STRING(300),
        allowNull: true
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE
    }
}, { sequelize: index_1.default });
// @ts-ignore
TutorFileCertificate.associate = function (models) {
    const { Tutor, File } = models;
    TutorFileCertificate.belongsTo(Tutor, {
        as: 'tutor',
        foreignKey: 'id_tutor'
    });
    TutorFileCertificate.belongsTo(File, {
        as: 'file',
        foreignKey: 'id_file'
    });
};
var TutorFileCertificateType;
(function (TutorFileCertificateType) {
    TutorFileCertificateType[TutorFileCertificateType["ENROLLMENT"] = 0] = "ENROLLMENT";
    TutorFileCertificateType[TutorFileCertificateType["GRADUATE"] = 1] = "GRADUATE";
})(TutorFileCertificateType = exports.TutorFileCertificateType || (exports.TutorFileCertificateType = {}));
exports.default = TutorFileCertificate;
