import { DataTypes, Model } from 'sequelize';

import sequelize from '../index';

class ClassRating extends Model {
    public id!: number;
    public id_class!: number;
    public id_user!: number;

    public value!: number;
    public commentary!: string|null;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date|null;
}

ClassRating.init({
    id: {
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		primaryKey: true
    },
    id_class: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    commentary: {
        type: DataTypes.TEXT,
        allowNull: true
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
ClassRating.associate = function(models: any) {};

export default ClassRating;