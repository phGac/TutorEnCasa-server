import { DataTypes, Model } from 'sequelize';

import sequelize from '../index';

class TutorTheme extends Model {
    id!: number;
    id_tutor!: number;
    id_theme!: number;

    readonly createdAt!: Date;
	readonly updatedAt!: Date|null;
}

TutorTheme.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_tutor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_theme: {
        type: DataTypes.INTEGER,
        allowNull: false
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
TutorTheme.associate = function(models) {}

export default TutorTheme;