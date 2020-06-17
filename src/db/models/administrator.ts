import { DataTypes, Model } from 'sequelize';

import sequelize from '../index';

class Administrator extends Model {
    public id!: number;
    public id_user!: number;
    public status!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date|null;
}

Administrator.init({
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
        allowNull: false,
    }
}, {
    sequelize
});

// @ts-ignore
Administrator.associate = function(models: any) {};

export default Administrator;