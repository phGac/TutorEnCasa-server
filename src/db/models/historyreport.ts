import { DataTypes, Model } from 'sequelize';

import sequelize from '../index';

class HistoryReport extends Model {
    id!: number;
    id_administrator!: number;

    type!: number;
    
    createdAt!: Date;
    updatedAt!: Date;
}

HistoryReport.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_administrator: {
        type: DataTypes.INTEGER
    },
    type: {
        type: DataTypes.INTEGER
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, { sequelize });

// @ts-ignore
HistoryReport.associate = function(models) {
    const { Administrator } = models;
    HistoryReport.belongsTo(Administrator, {
        as: 'administrator',
        foreignKey: 'id_administrator'
    });
};

export default HistoryReport;