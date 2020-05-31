import { DataTypes, Model } from 'sequelize';

import sequelize from '../index';

class Class extends Model {
    public id!: number;
    public id_tutor!: number;

    public start!: Date;
    public finish!: Date;

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
Class.associate = function(models: any) {};

export { Class };