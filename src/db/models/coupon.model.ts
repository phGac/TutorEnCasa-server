import { DataTypes, Model, UUIDV4 } from 'sequelize';
import { generate as voucher } from 'voucher-code-generator';

import sequelize from '../index';
import CouponGift from './coupongift.model';

class Coupon extends Model {
    id!: string;
    id_payment!: number;
    id_user!: number;

    value!: number;
    expires!: Date;
    status!: number;

    gift!: CouponGift;

    readonly createdAt!: Date;
	readonly updatedAt!: Date|null;
}

enum CouponStatus {
    UNPAY,
    PAY,
    USED
}

Coupon.init({
    id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        defaultValue: () => (voucher({ length: 10, count: 1 })[0])
    },
    id_payment: {
        type: DataTypes.INTEGER
    },
    id_user: {
        type: DataTypes.INTEGER
    },
    value: {
        type: DataTypes.INTEGER
    },
    expires: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: CouponStatus.UNPAY
    },
    createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW
	},
	updatedAt: {
		type: DataTypes.DATE,
		allowNull: true
	}
}, { sequelize });

// @ts-ignore
Coupon.associate = function(models) {
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
}

export {
    CouponStatus
}

export default Coupon;