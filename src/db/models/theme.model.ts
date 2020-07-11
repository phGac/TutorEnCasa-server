import { DataTypes, Model } from 'sequelize';

import sequelize from '../index';

class Theme extends Model {
    id!: number;

    name!: string;
    description!: string|null;

    readonly createdAt!: Date;
	readonly updatedAt!: Date|null;
}

Theme.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(20)
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE
    }
}, { sequelize });

// @ts-ignore
Theme.associate = function(models) {
    const { Tutor, TutorTheme } = models;
    Theme.belongsToMany(Tutor, {
		as: 'tutors',
		through: TutorTheme,
		foreignKey: 'id_theme',
		otherKey: 'id_tutor'
	});
}

export default Theme;