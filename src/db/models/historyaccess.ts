import { DataTypes, Model } from 'sequelize';

import sequelize from '../index';

class HistoryAccess extends Model {
    public id!: number;
    public id_user!: number;
    public ip!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date|null;
}

HistoryAccess.init({
    id: {
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		primaryKey: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ip: {
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
HistoryAccess.associate = function(models: any) {};

export { HistoryAccess };