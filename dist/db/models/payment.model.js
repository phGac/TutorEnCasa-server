"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = void 0;
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
class Payment extends sequelize_1.Model {
}
Payment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        comment: 'Id external service'
    },
    value: {
        type: sequelize_1.DataTypes.INTEGER
    },
    currency: {
        type: sequelize_1.DataTypes.STRING(3)
    },
    subject: {
        type: sequelize_1.DataTypes.STRING(100)
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE
    },
}, { sequelize: index_1.default });
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus[PaymentStatus["PENDING"] = 0] = "PENDING";
    PaymentStatus[PaymentStatus["VERIFYING"] = 1] = "VERIFYING";
    PaymentStatus[PaymentStatus["CANCELLED"] = 2] = "CANCELLED";
    PaymentStatus[PaymentStatus["PAID"] = 3] = "PAID";
})(PaymentStatus || (PaymentStatus = {}));
exports.PaymentStatus = PaymentStatus;
exports.default = Payment;
