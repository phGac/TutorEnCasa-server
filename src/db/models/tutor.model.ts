import { DataTypes, Model } from 'sequelize';

import sequelize from '../index';
import AvailabilityTime from './availabilitytime.model';
import Theme from './theme.model';
import File from './file.model';

class Tutor extends Model {
	public id!: number;
	public id_user!: number;

	public status!: number;
	public description!: string;
	public rating!: number;
	public themes!: Theme[];
	public times!: AvailabilityTime[];
	public certificates!: File[];

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
	description: {
		type: DataTypes.STRING(500),
		allowNull: true
	},
	rating: {
		type: DataTypes.DECIMAL(10, 3),
		allowNull: false,
		defaultValue: 0
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
	const { Class, AvailabilityTime, HistoryPriceHour, User, TutorTheme, Theme, TutorFileCertificate, File } = models;
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
	Tutor.belongsTo(User, {
		as: 'user',
		foreignKey: 'id_user'
	});
	Tutor.belongsToMany(Theme, {
		as: 'themes',
		through: TutorTheme,
		foreignKey: 'id_tutor',
		otherKey: 'id_theme'
	});
    Tutor.belongsToMany(File, {
        as: 'certificates',
		through: TutorFileCertificate,
		foreignKey: 'id_tutor',
		otherKey: 'id_file'
	});
};

export enum TutorStatus {
	UNVALIDATED,
	ACTIVE,
	INACTIVE,
	REJECTED
}

export default Tutor;