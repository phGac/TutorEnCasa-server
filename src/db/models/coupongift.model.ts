import { Model, DataTypes } from "sequelize";

import sequelize from '../index';

class CouponGift extends Model {
	id!: number;
	id_coupon!: number;
	id_user!: number;

	message!: string;
	readonly createdAt!: Date;
	readonly updatedAt!: Date;
}

CouponGift.init({
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	id_coupon: {
		type: DataTypes.STRING(10)
	},
	id_user: {
		type: DataTypes.INTEGER
	},
	createdAt: {
		type: DataTypes.DATE
	},
	updatedAt: {
		type: DataTypes.DATE
	}
}, { sequelize });

// @ts-ignore
CouponGift.associate = function(models) {
	const { User, Coupon } = models;

	CouponGift.belongsTo(User, {
		as: 'user',
		foreignKey: 'id_user'
	});
	CouponGift.belongsTo(Coupon, {
		as: 'coupon',
		foreignKey: 'id_coupon'
	});
};

export default CouponGift;