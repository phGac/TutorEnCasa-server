import { Model, DataTypes } from "sequelize";

import sequelize from '../index';

class ClassPayment extends Model {
	id!: number;
	id_class!: number;
	id_payment!: number;
	id_coupon!: number;

	readonly createdAt!: Date;
	readonly updatedAt!: Date;
}

ClassPayment.init({
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER
	},

	id_class: {
		type: DataTypes.INTEGER,
		allowNull: false
	},

	id_student: {
		type: DataTypes.INTEGER,
		allowNull: false
	},

	id_payment: {
		type: DataTypes.INTEGER,
		allowNull: false
	},

	id_coupon: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0
	},

	createdAt: {
		allowNull: false,
		type: DataTypes.DATE
	},

	updatedAt: {
		allowNull: false,
		type: DataTypes.DATE
	}
}, { sequelize });

// @ts-ignore
ClassPayment.associate = function(models) {
	const { Class, Payment, Coupon } = models;
	
	ClassPayment.belongsTo(Class, {
		as: 'class',
		foreignKey: 'id_class'
	});
	ClassPayment.belongsTo(Payment, {
		as: 'payment',
		foreignKey: 'id_payment'
	});
	ClassPayment.belongsTo(Coupon, {
		as: 'coupon',
		foreignKey: 'id_coupon'
	});
};

export default ClassPayment;