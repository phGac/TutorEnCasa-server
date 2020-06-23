import { DataTypes, Model } from 'sequelize';

import sequelize from '../index';

class HistoryPriceHour extends Model {
	public id!: number;
	public id_tutor_theme!: number;

	public price!: number;

	public readonly createdAt!: Date;
}

HistoryPriceHour.init({
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		primaryKey: true
	},
	id_tutor_theme: {
		type: DataTypes.INTEGER
	},
	price: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 16500
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW
	}
}, { sequelize });

// @ts-ignore
HistoryPriceHour.associate = function(models: any) {
	const { TutorTheme } = models;
	HistoryPriceHour.belongsTo(TutorTheme, {
		as: 'tutor_theme',
		foreignKey: 'id_tutor_theme'
	});
};

export default HistoryPriceHour;