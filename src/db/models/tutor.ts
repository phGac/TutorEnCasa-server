import { DataTypes, Model } from 'sequelize';

import sequelize from '../index';
import AvailabilityTime from './availabilitytime';
import Theme from './theme';

class Tutor extends Model {
	public id!: number;
	public id_user!: number;
	public status!: number;

	public themes!: Theme[];
	public times!: AvailabilityTime[];

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date|null;
}

Tutor.init({
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		primaryKey: true
	},
	id_user: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	status: {
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
Tutor.associate = function(models) {
	const { Class, AvailabilityTime, HistoryPriceHour, User, StudentTutor, TutorTheme, Theme } = models;
	Tutor.hasMany(Class, {
		as: 'classes',
		foreignKey: 'id_tutor'
	});
	Tutor.hasMany(AvailabilityTime, {
		as: 'times',
		foreignKey: 'id_tutor'
	});
	Tutor.hasMany(HistoryPriceHour, {
		as: 'priceses',
		foreignKey: 'id_tutor'
	});
	Tutor.belongsToMany(User, {
		as: 'students',
		through: StudentTutor,
		foreignKey: 'id_tutor',
		otherKey: 'id_student'
	});
	Tutor.belongsToMany(Theme, {
		as: 'themes',
		through: TutorTheme,
		foreignKey: 'id_tutor',
		otherKey: 'id_theme'
	});
};

export enum TutorStatus {
	UNVALIDATED,
	ACTIVE,
	INACTIVE
}

export default Tutor;