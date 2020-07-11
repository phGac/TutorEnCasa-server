import { DataTypes, Model } from 'sequelize';

import sequelize from '../index';

class Class extends Model {
	public id!: number;
	public id_tutor!: number;
	public id_tutor_theme!: number;

	public readonly price_hour!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date|null;
}

Class.init({
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		primaryKey: true
	},
	id_tutor: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	id_tutor_theme: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	price_hour: {
		type: DataTypes.INTEGER,
		allowNull: false
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
Class.associate = function(models: any) {
	const { Tutor, Schedule, ClassRating, HistoryStatusClass } = models;
	Class.belongsTo(Tutor, {
		as: 'tutor',
		foreignKey: 'id_tutor'
	});
	Class.hasMany(Schedule, {
		as: 'schedules',
		foreignKey: 'id_class'
	});
	Class.hasMany(ClassRating, {
		as: 'ratings',
		foreignKey: 'id_class'
	});
	Class.hasMany(HistoryStatusClass, {
		as: 'statuses',
		foreignKey: 'id_class'
	});
};

export default Class;