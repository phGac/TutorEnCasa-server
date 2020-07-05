import { DataTypes, Model, UUIDV4 } from 'sequelize';
import { v4 as uuid } from 'uuid';

import sequelize from '../index';

class Coupon extends Model {
    id!: string;
    id_user_from!: number;
    id_user_to!: number;

    message!: string|null;
    value!: number;
    expires!: Date;
    status!: number;

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
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: () => uuid()
    },
    id_user_from: {
        type: DataTypes.INTEGER
    },
    id_user_to: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true
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
    const { User } = models;
    Coupon.belongsTo(User, {
        as: 'from',
        foreignKey: 'id_user_from'
    });
    Coupon.belongsTo(User, {
        as: 'to',
        foreignKey: 'id_user_to'
    });
}

export {
    CouponStatus
}

export default Coupon;