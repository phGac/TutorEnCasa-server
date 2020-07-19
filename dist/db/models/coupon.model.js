"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponStatus = void 0;
const sequelize_1 = require("sequelize");
const voucher_code_generator_1 = require("voucher-code-generator");
const index_1 = __importDefault(require("../index"));
class Coupon extends sequelize_1.Model {
}
var CouponStatus;
(function (CouponStatus) {
    CouponStatus[CouponStatus["UNPAY"] = 0] = "UNPAY";
    CouponStatus[CouponStatus["PAY"] = 1] = "PAY";
    CouponStatus[CouponStatus["USED"] = 2] = "USED";
})(CouponStatus || (CouponStatus = {}));
exports.CouponStatus = CouponStatus;
Coupon.init({
    id: {
        type: sequelize_1.DataTypes.STRING(10),
        primaryKey: true,
        defaultValue: () => (voucher_code_generator_1.generate({ length: 10, count: 1 })[0])
    },
    id_payment: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_user: {
        type: sequelize_1.DataTypes.INTEGER
    },
    value: {
        type: sequelize_1.DataTypes.INTEGER
    },
    expires: {
        type: sequelize_1.DataTypes.DATE
    },
    status: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: CouponStatus.UNPAY
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
Coupon.associate = function (models) {
    const { User, CouponGift, Payment } = models;
    Coupon.belongsTo(User, {
        as: 'from',
        foreignKey: 'id_user'
    });
    Coupon.hasOne(CouponGift, {
        as: 'gift',
        foreignKey: 'id_coupon'
    });
    Coupon.belongsTo(Payment, {
        as: 'payment',
        foreignKey: 'id_payment'
    });
};
exports.default = Coupon;
