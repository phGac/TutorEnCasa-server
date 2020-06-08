import { DataTypes, Model } from 'sequelize';

import sequelize from '../index';

class HistoryStatusClass extends Model {
    public id!: number;
    public id_class!: number;

    public status!: number;
    public commentary!: string|null;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date|null;
}

HistoryStatusClass.init({
    id: {
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		primaryKey: true
    },
    id_class: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
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
HistoryStatusClass.associate = function(models: any) {
    const { Class } = models;
    HistoryStatusClass.belongsTo(Class, {
        as: 'class',
        foreignKey: 'id_class'
    });
};

export default HistoryStatusClass;