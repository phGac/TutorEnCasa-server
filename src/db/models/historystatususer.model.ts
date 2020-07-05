import { DataTypes, Model } from 'sequelize';

import sequelize from '../index';

class HistoryStatusUser extends Model {
    public id!: number;

    public id_user!: number;
    public status!: number;
    public commentary!: string;

    public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

HistoryStatusUser.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.INTEGER
    },
    commentary: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, { sequelize });

// @ts-ignore
HistoryStatusUser.associate = function(models) {
    const { User } = models;
    HistoryStatusUser.belongsTo(User, {
        as: 'user',
        foreignKey: 'id_user'
    });
};

export default HistoryStatusUser;