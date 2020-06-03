import { DataTypes, Model } from 'sequelize';

import sequelize from '../index';

class HistoryPriceHour extends Model {
    public id!: number;
    public id_tutor!: number;

    public price!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date|null;
}

HistoryPriceHour.init({
    id: {
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		primaryKey: true
    },
    id_tutor: {
        type: DataTypes.INTEGER,
        allowNull: false
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
    },
    updatedAt: {
        type: DataTypes.DATE,
		allowNull: true
    }
}, { sequelize });

// @ts-ignore
HistoryPriceHour.associate = function(models: any) {};

export default HistoryPriceHour;