import { DataTypes, Model, UUIDV4 } from 'sequelize';
import { v4 as uuid } from 'uuid';

import sequelize from '../index';

class Coupon extends Model {
    id!: string;
    id_user!: number;

    message!: string|null;
    value!: number;
    expires!: Date;

    readonly createdAt!: Date;
	readonly updatedAt!: Date|null;
}

Coupon.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: uuid()
    },
    id_user: {
        type: DataTypes.INTEGER
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    expires: {
        type: DataTypes.DATE
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
    Coupon.hasOne(User, {
        as: 'user',
        foreignKey: 'id_user'
    });
}

export default Coupon;